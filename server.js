const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);
const host = '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const root = __dirname;
const downloadsDir = path.join(root, '.downloads');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.tpk': 'application/octet-stream',
};

async function ensureDir(dirPath) { await fsp.mkdir(dirPath, { recursive: true }); }

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf-8');
}

function buildRepoUrl(cosmosUrl) {
  const trimmed = cosmosUrl.trim().replace(/\/+$/, '');
  return `${trimmed}/repos/product/armv7l/packages/armv7l/`;
}

async function findRpmUrl(repoUrl) {
  const response = await fetch(repoUrl);
  if (!response.ok) throw new Error(`RPM index fetch failed (${response.status})`);
  const html = await response.text();
  const matches = [...html.matchAll(/href=["']([^"']+\.rpm)["']/gi)].map((item) => item[1]);
  if (!matches.length) throw new Error('No rpm file found in repo index');
  const preferred = matches.find((item) => /smartthings|com\.samsung\.tv\.smartthingsapp/i.test(item)) || matches[0];
  return new URL(preferred, repoUrl).toString();
}

async function downloadFile(url, targetPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status})`);
  const arrayBuffer = await response.arrayBuffer();
  await fsp.writeFile(targetPath, Buffer.from(arrayBuffer));
}

async function runShellExtract(cmd, cwd) {
  await execFileAsync('bash', ['-lc', cmd], { cwd, maxBuffer: 1024 * 1024 * 40 });
}

async function findFileRecursive(dir, pattern) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findFileRecursive(fullPath, pattern);
      if (nested) return nested;
    } else if (pattern.test(entry.name) || pattern.test(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

async function findAllFilesRecursive(dir, pattern, acc = []) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findAllFilesRecursive(fullPath, pattern, acc);
    } else if (pattern.test(entry.name) || pattern.test(fullPath)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

async function ensureExtractCommands() {
  await execFileAsync('bash', ['-lc', 'command -v rpm2cpio >/dev/null && command -v cpio >/dev/null']);
}

function pickLatestSmartThingsTpk(candidates) {
  const toVersion = (name) => {
    const matched = name.match(/SmartThingsApp-(\d+(?:\.\d+)*)\.tpk/i);
    if (!matched) return [];
    return matched[1].split('.').map((n) => Number.parseInt(n, 10) || 0);
  };
  return [...candidates].sort((a, b) => {
    const va = toVersion(path.basename(a));
    const vb = toVersion(path.basename(b));
    const len = Math.max(va.length, vb.length);
    for (let i = 0; i < len; i += 1) {
      const diff = (vb[i] || 0) - (va[i] || 0);
      if (diff !== 0) return diff;
    }
    return path.basename(a).localeCompare(path.basename(b));
  })[0];
}

async function handleExtractTpk(req, res) {
  try {
    const bodyRaw = await readBody(req);
    const { cosmosUrl } = JSON.parse(bodyRaw || '{}');
    if (!cosmosUrl) return sendJson(res, 400, { error: 'cosmosUrl is required' });
    await ensureExtractCommands();

    const repoUrl = buildRepoUrl(cosmosUrl);
    const rpmUrl = await findRpmUrl(repoUrl);

    const workDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'toolbox-smartthings-'));
    const rpmPath = path.join(workDir, path.basename(new URL(rpmUrl).pathname) || 'target.rpm');
    await downloadFile(rpmUrl, rpmPath);

    await runShellExtract(`rpm2cpio "${rpmPath}" | cpio -idmv`, workDir);

    const cpioFile = await findFileRecursive(workDir, /\.cpio$/i);
    if (!cpioFile) throw new Error('cpio file not found after rpm extraction');
    const cpioDir = path.join(workDir, 'cpio-expanded');
    await ensureDir(cpioDir);
    await runShellExtract(`cpio -idmv < "${cpioFile}"`, cpioDir);

    const preloadDir = await findFileRecursive(cpioDir, /(?:^|[/\\])usr[/\\]apps[/\\]\.preload-rw-tpk$/i);
    if (!preloadDir) throw new Error('usr/apps/.preload-rw-tpk directory was not found');
    const tpkCandidates = await findAllFilesRecursive(preloadDir, /com\.samsung\.tv\.SmartThingsApp-.*\.tpk$/i);
    const tpkFile = pickLatestSmartThingsTpk(tpkCandidates);
    if (!tpkFile) throw new Error('SmartThings TPK not found in extracted files');

    await ensureDir(downloadsDir);
    const finalName = path.basename(tpkFile);
    const outputPath = path.join(downloadsDir, finalName);
    await fsp.copyFile(tpkFile, outputPath);

    sendJson(res, 200, {
      fileName: finalName,
      downloadPath: `/downloads/${encodeURIComponent(finalName)}`,
      repoUrl,
      rpmUrl,
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${host}:${port}`);

  if (req.method === 'POST' && requestUrl.pathname === '/api/smartthings/extract-tpk') {
    return handleExtractTpk(req, res);
  }

  if (requestUrl.pathname.startsWith('/downloads/')) {
    const fileName = path.basename(decodeURIComponent(requestUrl.pathname.replace('/downloads/', '')));
    const filePath = path.join(downloadsDir, fileName);
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
      res.end(content);
    });
    return;
  }

  const requestPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;
  const safePath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(root, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const extension = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[extension] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(port, host, () => {
  console.log(`Tool Box server running at http://${host}:${port}`);
});
