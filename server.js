const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { URL } = require('url');
const { execFileSync } = require('child_process');

const host = '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const root = __dirname;
const SMARTTHINGS_PREFIX = 'com.samsung.tv.SmartThingsApp-';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function send(res, statusCode, body, contentType = 'text/plain; charset=utf-8', extraHeaders = {}) {
  res.writeHead(statusCode, { 'Content-Type': contentType, ...extraHeaders });
  res.end(body);
}

function normalizeArtifactUrl(raw) {
  const parsed = new URL(raw);
  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error('http 또는 https URL만 지원합니다.');
  }
  parsed.pathname = parsed.pathname.replace(/\/?$/, '/');
  return parsed.toString();
}

function buildPackagesUrl(artifactUrl) {
  return new URL('repos/product/armv7l/packages/armv7l/', normalizeArtifactUrl(artifactUrl)).toString();
}

function extractRpmLinks(html, baseUrl) {
  const matches = [...html.matchAll(/href=["']([^"']+\.rpm)["']/gi)];
  const links = matches.map((match) => new URL(match[1], baseUrl).toString());
  return [...new Set(links)];
}

function prioritizeRpmLinks(links) {
  const score = (url) => {
    const lower = url.toLowerCase();
    let value = 0;
    if (lower.includes('smartthings')) value += 100;
    if (lower.includes('tv')) value += 25;
    if (lower.includes('preload')) value += 20;
    if (lower.includes('app')) value += 10;
    return value;
  };

  return [...links].sort((a, b) => score(b) - score(a) || a.localeCompare(b));
}

async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} while fetching ${url}`);
    }
    return response.text();
  } catch (error) {
    throw new Error(`Unable to fetch ${url}: ${error.message}`);
  }
}

async function fetchBuffer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} while downloading ${url}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    throw new Error(`Unable to download ${url}: ${error.message}`);
  }
}

function detectPayload(buffer) {
  const signatures = [
    { type: 'xz', magic: Buffer.from([0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00]) },
    { type: 'gzip', magic: Buffer.from([0x1f, 0x8b]) },
    { type: 'cpio', magic: Buffer.from('070701') },
  ];

  for (const signature of signatures) {
    const offset = buffer.indexOf(signature.magic);
    if (offset !== -1) {
      return { type: signature.type, offset };
    }
  }

  throw new Error('지원하지 않는 rpm payload 형식입니다.');
}

function decompressPayload(payloadBuffer, type) {
  if (type === 'cpio') {
    return payloadBuffer;
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'toolbox-rpm-'));
  const inputPath = path.join(tempDir, `payload.${type === 'xz' ? 'xz' : 'gz'}`);
  fs.writeFileSync(inputPath, payloadBuffer);

  try {
    if (type === 'xz') {
      return execFileSync('xz', ['-dc', inputPath], { maxBuffer: 1024 * 1024 * 512 });
    }

    if (type === 'gzip') {
      return execFileSync('gzip', ['-dc', inputPath], { maxBuffer: 1024 * 1024 * 512 });
    }

    throw new Error(`지원하지 않는 압축 형식: ${type}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function parseHexField(buffer, start, length) {
  return Number.parseInt(buffer.toString('ascii', start, start + length), 16);
}

function extractFileFromCpio(cpioBuffer, matcher) {
  let offset = 0;

  while (offset + 110 <= cpioBuffer.length) {
    const magic = cpioBuffer.toString('ascii', offset, offset + 6);
    if (magic !== '070701' && magic !== '070702') {
      throw new Error('지원하지 않는 cpio 형식입니다.');
    }

    const fileSize = parseHexField(cpioBuffer, offset + 54, 8);
    const nameSize = parseHexField(cpioBuffer, offset + 94, 8);
    const nameStart = offset + 110;
    const nameEnd = nameStart + nameSize;
    const rawName = cpioBuffer.toString('utf8', nameStart, nameEnd - 1);
    const dataStart = nameEnd + ((4 - (nameEnd % 4)) % 4);
    const dataEnd = dataStart + fileSize;

    if (rawName === 'TRAILER!!!') {
      break;
    }

    if (matcher(rawName)) {
      return {
        fileName: path.basename(rawName),
        fullPath: rawName,
        content: cpioBuffer.subarray(dataStart, dataEnd),
      };
    }

    offset = dataEnd + ((4 - (dataEnd % 4)) % 4);
  }

  return null;
}

async function extractSmartThingsTpk(artifactUrl) {
  const packagesUrl = buildPackagesUrl(artifactUrl);
  const listingHtml = await fetchText(packagesUrl);
  const rpmLinks = prioritizeRpmLinks(extractRpmLinks(listingHtml, packagesUrl));

  if (rpmLinks.length === 0) {
    throw new Error('packages 페이지에서 rpm 링크를 찾지 못했습니다.');
  }

  for (const rpmUrl of rpmLinks) {
    const rpmBuffer = await fetchBuffer(rpmUrl);
    const payload = detectPayload(rpmBuffer);
    const cpioBuffer = decompressPayload(rpmBuffer.subarray(payload.offset), payload.type);
    const extracted = extractFileFromCpio(cpioBuffer, (filePath) => {
      const normalized = filePath.replace(/^\./, '');
      return normalized.includes('/usr/apps/.preload-rw-tpk/') && path.basename(normalized).startsWith(SMARTTHINGS_PREFIX) && normalized.endsWith('.tpk');
    });

    if (extracted) {
      return {
        ...extracted,
        sourceRpm: rpmUrl,
        packagesUrl,
      };
    }
  }

  throw new Error('SmartThings TPK를 포함한 rpm을 찾지 못했습니다.');
}

async function handleExtract(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  let payload;
  try {
    payload = JSON.parse(body || '{}');
  } catch (error) {
    send(res, 400, '유효한 JSON body가 아닙니다.');
    return;
  }

  if (!payload.artifactUrl) {
    send(res, 400, 'artifactUrl이 필요합니다.');
    return;
  }

  try {
    const extracted = await extractSmartThingsTpk(payload.artifactUrl);
    send(res, 200, extracted.content, 'application/octet-stream', {
      'Content-Disposition': `attachment; filename="${extracted.fileName}"`,
      'X-Source-Rpm': extracted.sourceRpm,
      'X-Packages-Url': extracted.packagesUrl,
    });
  } catch (error) {
    send(res, 502, error.message);
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/smartthings/extract') {
    await handleExtract(req, res);
    return;
  }

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(root, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(res, error.code === 'ENOENT' ? 404 : 500, error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const extension = path.extname(filePath);
    send(res, 200, content, mimeTypes[extension] || 'application/octet-stream');
  });
});

server.listen(port, host, () => {
  console.log(`Tool Box server running at http://${host}:${port}`);
});
