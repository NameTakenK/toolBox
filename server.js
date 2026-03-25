const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const os = require('os');
const { execFile, spawn } = require('child_process');
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
  if (commandRuntime.mode === '7zip') {
    const actualCommand = command === '7z' ? commandRuntime.sevenZipPath : command;
    return runNativeCommand(actualCommand, args, cwd);
  }
  if (commandRuntime.mode === 'wsl') {
    return runCommandInWsl(command, args, cwd);
  }
  return runNativeCommand(command, args, cwd);
}

function runNativeCommand(command, args, cwd) {
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

function extractRpmToDir(rpmPath, cwd) {
  if (commandRuntime.mode === '7zip') {
    return runCommand('7z', ['x', rpmPath, `-o${cwd}`, '-y'], cwd);
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
  if (process.platform === 'win32') {
    const sevenZipCandidates = [
      process.env.SEVEN_ZIP_PATH,
      'C:\\Program Files\\7-Zip\\7z.exe',
      'C:\\Program Files (x86)\\7-Zip\\7z.exe',
    ].filter(Boolean);
    for (const candidate of sevenZipCandidates) {
      try {
        await fsp.access(candidate, fs.constants.X_OK);
        commandRuntime.mode = '7zip';
        commandRuntime.sevenZipPath = candidate;
        return;
      } catch {
        // Continue to next candidate.
      }
    }
    try {
      await execFileAsync('where', ['7z']);
      commandRuntime.mode = '7zip';
      commandRuntime.sevenZipPath = '7z';
      return;
    } catch {
      // Continue to rpm2cpio/cpio fallback checks below.
    }
  }

  const locator = process.platform === 'win32' ? 'where' : 'which';
  try {
    await execFileAsync(locator, ['rpm2cpio']);
    await execFileAsync(locator, ['cpio']);
    commandRuntime.mode = 'native';
  } catch {
    if (process.platform === 'win32') {
      try {
        await execFileAsync('wsl', ['bash', '-lc', 'command -v rpm2cpio && command -v cpio']);
        commandRuntime.mode = 'wsl';
        return;
      } catch {
        const winHint = 'Windows에서는 rpm2cpio/cpio를 찾지 못했습니다. 7-Zip(예: C:\\Program Files\\7-Zip\\7z.exe)을 설치하거나 WSL(Ubuntu)에 rpm2cpio/cpio를 설치한 뒤 다시 실행해 주세요.';
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

    const payloadCandidates = await findAllFilesRecursive(workDir, /(?:\.cpio$|payload(?:\.[^/\\]+)?$|rootfs(?:\.[^/\\]+)?$|image(?:\.[^/\\]+)?$)/i);
    const cpioFile = payloadCandidates.sort((a, b) => {
      const aPriority = /(?:payload|rootfs|image)(?:\.[^/\\]+)?$/i.test(path.basename(a)) ? 1 : 0;
      const bPriority = /(?:payload|rootfs|image)(?:\.[^/\\]+)?$/i.test(path.basename(b)) ? 1 : 0;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return b.localeCompare(a);
    })[0];
    if (!cpioFile) throw new Error('cpio payload file not found after rpm extraction');
    const cpioDir = path.join(workDir, 'cpio-expanded');
    await ensureDir(cpioDir);
    if (commandRuntime.mode === '7zip') {
      await runCommand('7z', ['x', cpioFile, `-o${cpioDir}`, '-y'], cpioDir);
    } else {
      await runCommand('cpio', ['-idmv', '-F', cpioFile], cpioDir);
    }

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
  } finally {
    if (workDir) await fsp.rm(workDir, { recursive: true, force: true }).catch(() => {});
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
