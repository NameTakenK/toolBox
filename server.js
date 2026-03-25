const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFile, spawn } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);
const host = '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const root = __dirname;
const downloadsDir = path.join(root, '.downloads');
const dataDir = path.join(root, '.data');
const newsDbPath = path.join(dataDir, 'news-db.json');
const defaultNewsState = { scheduleMinutes: 0, lastCollectedAt: null, items: [] };
const newsFeedUrl = 'https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko';
let newsScheduleTimer = null;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.tpk': 'application/octet-stream',
};

async function ensureDir(dirPath) { await fsp.mkdir(dirPath, { recursive: true }); }

const commandRuntime = { mode: 'native', sevenZipPath: null };

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
  const trimmed = cosmosUrl.trim();
  const parsed = new URL(trimmed);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error('Only http/https URLs are supported');
  const normalized = trimmed.replace(/\/+$/, '');
  if (/\/repos\/product\/armv7l\/packages\/armv7l$/i.test(normalized)) return `${normalized}/`;
  return `${normalized}/repos/product/armv7l/packages/armv7l/`;
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

function runCommand(command, args, cwd) {
  if (commandRuntime.mode === '7zip-cpio') {
    return runCommandWith7Zip(command, args, cwd);
  }
  if (commandRuntime.mode === 'wsl') {
    return runCommandInWsl(command, args, cwd);
  }
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) return resolve();
      reject(new Error(`${command} exited with code ${code}${stderr ? `: ${stderr.trim()}` : ''}`));
    });
  });
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

async function toWslPath(targetPath) {
  const { stdout } = await execFileAsync('wsl', ['wslpath', '-a', targetPath]);
  return stdout.trim();
}

async function runCommandInWsl(command, args, cwd) {
  const wslCwd = await toWslPath(cwd);
  const fullCommand = [command, ...args].map(shellQuote).join(' ');
  await execFileAsync('wsl', ['bash', '-lc', `cd ${shellQuote(wslCwd)} && ${fullCommand}`]);
}

async function runCommandWith7Zip(command, args, cwd) {
  if (command !== 'cpio') {
    throw new Error(`7-Zip 모드에서는 ${command} 명령을 지원하지 않습니다.`);
  }
  const cpioPathIndex = args.findIndex((arg) => arg === '-F');
  if (cpioPathIndex === -1 || !args[cpioPathIndex + 1]) {
    throw new Error('cpio 파일 경로를 찾지 못했습니다.');
  }
  await extractCpioWith7Zip(args[cpioPathIndex + 1], cwd);
}

function extractRpmToDir(rpmPath, cwd) {
  if (commandRuntime.mode === '7zip-cpio') {
    return extractRpmToDirWith7Zip(rpmPath, cwd);
  }
  if (commandRuntime.mode === 'wsl') {
    return extractRpmToDirInWsl(rpmPath, cwd);
  }
  return new Promise((resolve, reject) => {
    const rpm = spawn('rpm2cpio', [rpmPath], { cwd });
    const cpio = spawn('cpio', ['-idmv'], { cwd });
    let stderr = '';
    rpm.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    cpio.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    rpm.stdout.pipe(cpio.stdin);
    rpm.on('error', reject);
    cpio.on('error', reject);
    cpio.on('close', (code) => {
      if (code === 0) return resolve();
      reject(new Error(`cpio extraction failed (${code})${stderr ? `: ${stderr.trim()}` : ''}`));
    });
  });
}

async function extractRpmToDirInWsl(rpmPath, cwd) {
  const [wslRpmPath, wslCwd] = await Promise.all([toWslPath(rpmPath), toWslPath(cwd)]);
  const command = `cd ${shellQuote(wslCwd)} && rpm2cpio ${shellQuote(wslRpmPath)} | cpio -idmv`;
  await execFileAsync('wsl', ['bash', '-lc', command]);
}

async function extractRpmToDirWith7Zip(rpmPath, cwd) {
  const cpioPath = path.join(cwd, `${path.basename(rpmPath, path.extname(rpmPath))}.cpio`);
  await new Promise((resolve, reject) => {
    const out = fs.createWriteStream(cpioPath);
    const extractor = spawn(commandRuntime.sevenZipPath, ['x', '-so', rpmPath], { cwd });
    let stderr = '';
    let extractorClosed = false;
    let streamFinished = false;
    let closeCode = null;

    const settleIfDone = () => {
      if (!extractorClosed || !streamFinished) return;
      if (closeCode === 0) {
        resolve();
        return;
      }
      reject(new Error(`7-Zip RPM extraction failed (${closeCode})${stderr ? `: ${stderr.trim()}` : ''}`));
    };

    extractor.stdout.pipe(out);
    extractor.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    extractor.on('error', reject);
    out.on('error', reject);
    out.on('finish', () => {
      streamFinished = true;
      settleIfDone();
    });
    extractor.on('close', (code) => {
      closeCode = code;
      extractorClosed = true;
      settleIfDone();
    });
  });
}

async function extractCpioWith7Zip(cpioPath, cwd) {
  await execFileAsync(commandRuntime.sevenZipPath, ['x', '-y', cpioPath, `-o${cwd}`]);
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

async function findAllDirsRecursive(dir, pattern, acc = []) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (pattern.test(entry.name) || pattern.test(fullPath)) acc.push(fullPath);
      await findAllDirsRecursive(fullPath, pattern, acc);
    }
  }
  return acc;
}

async function ensureExtractCommands() {
  const locator = process.platform === 'win32' ? 'where' : 'which';
  try {
    await execFileAsync(locator, ['rpm2cpio']);
    await execFileAsync(locator, ['cpio']);
    commandRuntime.mode = 'native';
    commandRuntime.sevenZipPath = null;
  } catch {
    if (process.platform === 'win32') {
      const sevenZipPath = 'C:\\Program Files\\7-Zip\\7z.exe';
      try {
        await fsp.access(sevenZipPath, fs.constants.F_OK);
        commandRuntime.mode = '7zip-cpio';
        commandRuntime.sevenZipPath = sevenZipPath;
        return;
      } catch {
        // no-op: fall through to WSL fallback below
      }
      try {
        await execFileAsync('wsl', ['bash', '-lc', 'command -v rpm2cpio && command -v cpio']);
        commandRuntime.mode = 'wsl';
        commandRuntime.sevenZipPath = null;
        return;
      } catch {
        const winHint = 'Windows에서는 rpm2cpio/cpio를 찾지 못했습니다. 먼저 "C:\\Program Files\\7-Zip\\7z.exe"를 설치(또는 확인)해 rpm/cpio를 7-Zip으로 추출하거나, WSL(Ubuntu)에 rpm2cpio/cpio를 설치해 주세요.';
        throw new Error(winHint);
      }
    }
    const unixHint = 'rpm2cpio/cpio 명령을 먼저 설치해 주세요. Ubuntu/Debian: sudo apt-get install rpm2cpio cpio';
    throw new Error(unixHint);
  }
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
  let workDir;
  try {
    const bodyRaw = await readBody(req);
    const { cosmosUrl } = JSON.parse(bodyRaw || '{}');
    if (!cosmosUrl) return sendJson(res, 400, { error: 'cosmosUrl is required' });
    await ensureExtractCommands();

    const repoUrl = buildRepoUrl(cosmosUrl);
    const rpmUrl = await findRpmUrl(repoUrl);

    workDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'toolbox-smartthings-'));
    const rpmPath = path.join(workDir, path.basename(new URL(rpmUrl).pathname) || 'target.rpm');
    await downloadFile(rpmUrl, rpmPath);

    await extractRpmToDir(rpmPath, workDir);

    const cpioCandidates = await findAllFilesRecursive(workDir, /\.cpio$/i);
    const cpioFile = cpioCandidates.sort((a, b) => {
      const aPriority = /(?:payload|rootfs|image)\.cpio$/i.test(a) ? 1 : 0;
      const bPriority = /(?:payload|rootfs|image)\.cpio$/i.test(b) ? 1 : 0;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return b.localeCompare(a);
    })[0];
    if (!cpioFile) throw new Error('cpio file not found after rpm extraction');
    const cpioDir = path.join(workDir, 'cpio-expanded');
    await ensureDir(cpioDir);
    await runCommand('cpio', ['-idmv', '-F', cpioFile], cpioDir);

    const preloadCandidates = await findAllDirsRecursive(cpioDir, /(?:^|[/\\])\.preload-rw-tpk$/i);
    const preloadDir = preloadCandidates.find((candidate) => path.basename(candidate).toLowerCase() === '.preload-rw-tpk')
      || await findFileRecursive(cpioDir, /(?:^|[/\\])usr[/\\]apps[/\\]\.preload-rw-tpk$/i);
    if (!preloadDir) {
      const notableDirs = await findAllDirsRecursive(cpioDir, /(?:^|[/\\])(?:usr|apps|preload|tpk)(?:$|[/\\])/i);
      const preview = notableDirs.slice(0, 20).map((item) => path.relative(cpioDir, item) || '.').join(', ');
      throw new Error(`.preload-rw-tpk directory was not found in extracted payload${preview ? ` (sample paths: ${preview})` : ''}`);
    }
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
  } finally {
    if (workDir) await fsp.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

function decodeXmlEntities(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'');
}

function stripHtml(value = '') {
  return decodeXmlEntities(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseTag(itemXml, tagName) {
  const matched = itemXml.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`, 'i'));
  return matched ? matched[1].trim() : '';
}

function parseRssItems(xmlText) {
  const items = [];
  const itemBlocks = xmlText.match(/<item>[\s\S]*?<\/item>/gi) || [];
  for (const block of itemBlocks.slice(0, 10)) {
    const titleRaw = parseTag(block, 'title');
    const descriptionRaw = parseTag(block, 'description');
    const pubDateRaw = parseTag(block, 'pubDate');
    const sourceRaw = parseTag(block, 'source') || 'Google News';
    const body = stripHtml(descriptionRaw);
    const publishedAt = new Date(pubDateRaw);
    items.push({
      id: crypto.randomUUID(),
      date: Number.isNaN(publishedAt.getTime()) ? new Date().toISOString() : publishedAt.toISOString(),
      title: stripHtml(titleRaw),
      body,
      source: stripHtml(sourceRaw),
      createdAt: new Date().toISOString(),
    });
  }
  return items;
}

async function readNewsState() {
  try {
    const raw = await fsp.readFile(newsDbPath, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      scheduleMinutes: Number(parsed.scheduleMinutes) || 0,
      lastCollectedAt: parsed.lastCollectedAt || null,
      items: Array.isArray(parsed.items) ? parsed.items : [],
    };
  } catch {
    return { ...defaultNewsState };
  }
}

async function writeNewsState(state) {
  await ensureDir(dataDir);
  await fsp.writeFile(newsDbPath, JSON.stringify(state, null, 2), 'utf-8');
}

async function collectHotNews() {
  const response = await fetch(newsFeedUrl);
  if (!response.ok) throw new Error(`뉴스 RSS를 가져오지 못했습니다 (${response.status})`);
  const xmlText = await response.text();
  const latestItems = parseRssItems(xmlText);
  if (!latestItems.length) throw new Error('수집할 뉴스가 없습니다.');

  const state = await readNewsState();
  const dedupeKey = (item) => `${item.date}|${item.title}|${item.source}`;
  const existing = new Set(state.items.map(dedupeKey));
  const merged = [...latestItems.filter((item) => !existing.has(dedupeKey(item))), ...state.items];
  const nextState = {
    ...state,
    lastCollectedAt: new Date().toISOString(),
    items: merged.slice(0, 300),
  };
  await writeNewsState(nextState);
  return { collected: latestItems.length, state: nextState };
}

async function configureNewsSchedule(scheduleMinutes) {
  if (newsScheduleTimer) {
    clearInterval(newsScheduleTimer);
    newsScheduleTimer = null;
  }
  if (scheduleMinutes > 0) {
    newsScheduleTimer = setInterval(() => {
      collectHotNews().catch((error) => console.error('[news-collector] schedule collect failed:', error.message));
    }, scheduleMinutes * 60 * 1000);
  }
  const state = await readNewsState();
  const nextState = { ...state, scheduleMinutes };
  await writeNewsState(nextState);
  return nextState;
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${host}:${port}`);

  if (req.method === 'POST' && requestUrl.pathname === '/api/smartthings/extract-tpk') {
    return handleExtractTpk(req, res);
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/private/news') {
    const state = await readNewsState();
    return sendJson(res, 200, state);
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/private/news/collect') {
    try {
      const result = await collectHotNews();
      return sendJson(res, 200, result.state);
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (req.method === 'POST' && requestUrl.pathname === '/api/private/news/schedule') {
    try {
      const bodyRaw = await readBody(req);
      const { scheduleMinutes } = JSON.parse(bodyRaw || '{}');
      const numeric = Number(scheduleMinutes);
      if (!Number.isFinite(numeric) || numeric < 0) return sendJson(res, 400, { error: 'scheduleMinutes must be 0 or greater' });
      const state = await configureNewsSchedule(Math.floor(numeric));
      return sendJson(res, 200, state);
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (req.method === 'PUT' && requestUrl.pathname.startsWith('/api/private/news/')) {
    try {
      const id = decodeURIComponent(requestUrl.pathname.replace('/api/private/news/', ''));
      const bodyRaw = await readBody(req);
      const payload = JSON.parse(bodyRaw || '{}');
      const state = await readNewsState();
      const index = state.items.findIndex((item) => item.id === id);
      if (index === -1) return sendJson(res, 404, { error: 'Item not found' });
      const nextItem = {
        ...state.items[index],
        date: typeof payload.date === 'string' ? payload.date : state.items[index].date,
        title: typeof payload.title === 'string' ? payload.title : state.items[index].title,
        body: typeof payload.body === 'string' ? payload.body : state.items[index].body,
        source: typeof payload.source === 'string' ? payload.source : state.items[index].source,
        updatedAt: new Date().toISOString(),
      };
      state.items[index] = nextItem;
      await writeNewsState(state);
      return sendJson(res, 200, nextItem);
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (req.method === 'DELETE' && requestUrl.pathname === '/api/private/news') {
    try {
      const bodyRaw = await readBody(req);
      const { ids } = JSON.parse(bodyRaw || '{}');
      if (!Array.isArray(ids) || !ids.length) return sendJson(res, 400, { error: 'ids is required' });
      const state = await readNewsState();
      const idSet = new Set(ids);
      state.items = state.items.filter((item) => !idSet.has(item.id));
      await writeNewsState(state);
      return sendJson(res, 200, state);
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
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

(async () => {
  const state = await readNewsState();
  if (state.scheduleMinutes > 0) await configureNewsSchedule(state.scheduleMinutes);
})();
