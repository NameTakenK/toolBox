const translations = {
  ko: {
    heroTitle: '개발자를 위한 실전형 Tool Box',
    heroCopy: 'QR, 텍스트, JSON, SmartThings 작업을 빠르게 처리할 수 있는 생산성 도구 모음입니다.',
    languageLabel: '언어', themeLabel: '테마', themeDark: '다크', themeLight: '라이트', themeSystem: '시스템',
    tabQr: 'QR 도구', tabText: '텍스트 카운터', tabJson: 'JSON Pretty Viewer', tabSmartthings: 'SmartThings TV', tabPrivate: 'Private',
    qrToolTitle: 'QR Maker & Reader', qrContentLabel: 'QR 내용', iterationLabel: '반복 횟수', qrErrorLevel: '오류 보정', qrMargin: '여백', qrVersion: '버전', qrDarkColor: '전경색', qrLightColor: '배경색',
    benchmarkButton: '벤치마킹 실행', realBenchmarkButton: '리얼 벤치마킹 실행', downloadButton: 'PNG 다운로드', uploadLabel: 'QR 이미지 업로드',
    cameraStartButton: '카메라 열기', cameraStopButton: '카메라 닫기', readerResultTitle: '리더 결과', cameraStatusTitle: '카메라 상태', previewBenchmarkTitle: 'Preview & Benchmark',
    benchmarkResultTitle: '벤치마킹 결과', realBenchmarkResultTitle: '리얼 벤치마킹 결과', benchmarkPlaceholder: '버튼을 누르면 QR 생성 반복 벤치마킹을 실행합니다.',
    realBenchmarkPlaceholder: '카메라를 연 뒤 버튼을 누르면 실제 카메라 프레임 인식 성능을 측정합니다.',
    textTitle: '텍스트 카운터+', textInputLabel: '텍스트 입력', charCount: '글자수', byteCount: '바이트수 (UTF-8)', lineCount: '줄 수', trimmedCount: '공백 제외',
    wordCount: '단어 수', sentenceCount: '문장 수', paragraphCount: '문단 수', readingTime: '예상 읽기 시간',
    jsonInputTitle: 'JSON 입력', jsonRawLabel: '원본 입력', jsonPrettyTitle: 'Pretty Viewer', jsonErrorTitle: '파싱 오류',
    sizeLabel: '사이즈', readerPlaceholder: '업로드한 이미지의 QR을 읽으면 결과가 여기에 표시됩니다.', cameraPlaceholder: '카메라를 열면 실시간 QR 확인과 리얼 벤치마킹을 실행할 수 있습니다.',
    liveDetected: '실시간 인식 결과', liveWaiting: '카메라 프레임에서 QR을 찾는 중입니다.', cameraUnsupported: '이 브라우저에서는 카메라 API를 지원하지 않습니다.',
    cameraStarted: '카메라가 열렸습니다.', cameraStartFailed: '카메라를 열지 못했습니다.', cameraStopped: '카메라가 중지되었습니다.',
    realBenchmarkNeedCamera: '리얼 벤치마킹을 실행하려면 카메라를 먼저 열어 주세요.', realBenchmarkRunning: '리얼 벤치마킹 실행 중', realBenchmarkSuccess: '성공', realBenchmarkFailure: '실패', realBenchmarkDetector: '디코더',
    avgLabel: '평균', totalLabel: '총합', charsUnit: 'chars', iterationUnit: '회', benchmarkDone: '생성 벤치마킹 완료',
    smartExtractTab: 'Extract tpk file from Cosmos URL', smartExtractTitle: 'Extract tpk file from Cosmos URL', smartCosmosLabel: 'Cosmos URL', smartExtractButton: '추출 시작', smartDownloadButton: 'TPK 다운로드', smartStatusTitle: '진행 상태',
    smartReady: '준비됨', smartStatusPreparing: '준비 중...', smartStatusExtracting: '추출 중...', smartStatusDone: '완료', smartStatusError: '오류', smartWindowsHint: 'Windows 안내: 기본 CMD/Powershell에서는 rpm2cpio/cpio를 바로 사용할 수 없습니다. WSL(Ubuntu) 또는 Linux/macOS 환경에서 서버를 실행해 주세요.',
    quickSection: '바로가기', quickQr: 'QR 생성기', quickText: '텍스트 카운터', quickJson: 'JSON 포맷터', quickSmart: 'TPK 추출기', quickPrivate: '뉴스 수집',
  },
  en: {
    heroTitle: 'Practical Tool Box for Developers', heroCopy: 'A focused utility suite for QR, text, JSON, and SmartThings workflows.',
    languageLabel: 'Language', themeLabel: 'Theme', themeDark: 'Dark', themeLight: 'Light', themeSystem: 'System',
    tabQr: 'QR Tools', tabText: 'Text Counter', tabJson: 'JSON Pretty Viewer', tabSmartthings: 'SmartThings TV', tabPrivate: 'Private',
    qrToolTitle: 'QR Maker & Reader', qrContentLabel: 'QR content', iterationLabel: 'Iterations', qrErrorLevel: 'Error correction', qrMargin: 'Margin', qrVersion: 'Version', qrDarkColor: 'Foreground', qrLightColor: 'Background',
    benchmarkButton: 'Run benchmark', realBenchmarkButton: 'Run real benchmark', downloadButton: 'Download PNG', uploadLabel: 'Upload QR image',
    cameraStartButton: 'Open camera', cameraStopButton: 'Close camera', readerResultTitle: 'Reader result', cameraStatusTitle: 'Camera status', previewBenchmarkTitle: 'Preview & Benchmark',
    benchmarkResultTitle: 'Benchmark results', realBenchmarkResultTitle: 'Real benchmark results', benchmarkPlaceholder: 'Run repeated QR generation benchmark.', realBenchmarkPlaceholder: 'Open camera and measure real frame decoding performance.',
    textTitle: 'Text Counter+', textInputLabel: 'Text input', charCount: 'Characters', byteCount: 'Bytes (UTF-8)', lineCount: 'Lines', trimmedCount: 'Without spaces', wordCount: 'Words', sentenceCount: 'Sentences', paragraphCount: 'Paragraphs', readingTime: 'Reading time',
    jsonInputTitle: 'JSON input', jsonRawLabel: 'Raw input', jsonPrettyTitle: 'Pretty Viewer', jsonErrorTitle: 'Parse error', sizeLabel: 'Size',
    readerPlaceholder: 'Decoded result appears here.', cameraPlaceholder: 'Open camera to inspect live QR detection.', liveDetected: 'Live detection', liveWaiting: 'Waiting for QR from camera frame.',
    cameraUnsupported: 'Camera API is not supported.', cameraStarted: 'Camera started.', cameraStartFailed: 'Failed to open camera.', cameraStopped: 'Camera stopped.',
    realBenchmarkNeedCamera: 'Open camera before real benchmark.', realBenchmarkRunning: 'Running real benchmark', realBenchmarkSuccess: 'Success', realBenchmarkFailure: 'Failure', realBenchmarkDetector: 'Detector',
    avgLabel: 'Average', totalLabel: 'Total', charsUnit: 'chars', iterationUnit: 'runs', benchmarkDone: 'Generation benchmark complete',
    smartExtractTab: 'Extract tpk file from Cosmos URL', smartExtractTitle: 'Extract tpk file from Cosmos URL', smartCosmosLabel: 'Cosmos URL', smartExtractButton: 'Start extraction', smartDownloadButton: 'Download TPK', smartStatusTitle: 'Status',
    smartReady: 'Ready', smartStatusPreparing: 'Preparing...', smartStatusExtracting: 'Extracting...', smartStatusDone: 'Done', smartStatusError: 'Error', smartWindowsHint: 'Windows note: rpm2cpio/cpio are not directly available in default CMD/Powershell. Run the server in WSL (Ubuntu) or Linux/macOS.',
    quickSection: 'Quick access', quickQr: 'QR generator', quickText: 'Text counter', quickJson: 'JSON formatter', quickSmart: 'TPK extractor', quickPrivate: 'News collector',
  },
};

const $ = (id) => document.getElementById(id);
const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
const menuToggleButton = $('menu-toggle'); const sideRail = $('side-rail'); const menuBackdrop = $('menu-backdrop');
const subTabButtons = document.querySelectorAll('[data-sub-tab-target]');
const subTabPanels = document.querySelectorAll('[data-sub-tab-panel]');

const qrInput = $('qr-input'); const qrSize = $('qr-size'); const qrSizeLabel = $('qr-size-label'); const qrImage = $('qr-image'); const downloadLink = $('download-link');
const qrErrorLevel = $('qr-error-level'); const qrMargin = $('qr-margin'); const qrVersion = $('qr-version'); const qrColorDark = $('qr-color-dark'); const qrColorLight = $('qr-color-light');
const benchmarkButton = $('benchmark-button'); const benchmarkList = $('benchmark-list'); const realBenchmarkButton = $('real-benchmark-button'); const realBenchmarkList = $('real-benchmark-list');
const benchmarkIterationsInput = $('benchmark-iterations'); const uploadInput = $('qr-upload'); const qrReadResult = $('qr-read-result'); const qrCanvas = $('qr-canvas');
const cameraPreview = $('camera-preview'); const cameraStartButton = $('camera-start-button'); const cameraStopButton = $('camera-stop-button'); const cameraStatus = $('camera-status');
const languageSelect = $('language-select'); const themeSelect = $('theme-select');
const textInput = $('text-input'); const charCount = $('char-count'); const byteCount = $('byte-count'); const lineCount = $('line-count'); const trimmedCount = $('trimmed-count');
const wordCount = $('word-count'); const sentenceCount = $('sentence-count'); const paragraphCount = $('paragraph-count'); const readingTime = $('reading-time');
const textTrimLinesButton = $('text-trim-lines-button'); const textRemoveEmptyButton = $('text-remove-empty-button'); const textDedupeLinesButton = $('text-dedupe-lines-button');
const textSortLinesButton = $('text-sort-lines-button'); const textUpperButton = $('text-upper-button'); const textLowerButton = $('text-lower-button');
const jsonInput = $('json-input'); const jsonOutput = $('json-output'); const jsonError = $('json-error'); const jsonErrorText = jsonError.querySelector('p');
const jsonFormatButton = $('json-format-button'); const jsonMinifyButton = $('json-minify-button'); const jsonCopyButton = $('json-copy-button');
const cosmosUrlInput = $('cosmos-url-input'); const extractTpkButton = $('extract-tpk-button'); const downloadTpkLink = $('download-tpk-link'); const smartthingsStatus = $('smartthings-status'); const smartthingsHelp = $('smartthings-help');
const newsScheduleMinutesInput = $('news-schedule-minutes'); const newsScheduleSaveButton = $('news-schedule-save-button'); const newsCollectNowButton = $('news-collect-now-button');
const newsDeleteSelectedButton = $('news-delete-selected-button'); const newsExportSelectedButton = $('news-export-selected-button'); const newsStatusText = $('news-status-text'); const newsList = $('news-list');
const quickQrButton = $('quick-qr-button'); const quickTextButton = $('quick-text-button'); const quickJsonButton = $('quick-json-button'); const quickSmartthingsButton = $('quick-smartthings-button'); const quickPrivateButton = $('quick-private-button');

const encoder = new TextEncoder(); const settingsStorageKey = 'tool-box-settings'; const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');
let currentLanguage = 'ko'; let currentTheme = 'dark'; let cameraStream = null; let liveScanInterval = null; let barcodeDetector = null;
let newsItems = [];

const t = (k) => translations[currentLanguage][k] || translations.ko[k] || k;

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  qrSizeLabel.textContent = `${t('sizeLabel')}: ${qrSize.value}px`;
  if (!smartthingsStatus.dataset.busy) setStatus(smartthingsStatus, t('smartReady'));
  setSmartthingsHelp('');
}
function loadSettings() {
  try { const saved = JSON.parse(localStorage.getItem(settingsStorageKey) || '{}'); currentLanguage = saved.language || 'ko'; currentTheme = saved.theme || 'dark'; } catch {}
  languageSelect.value = currentLanguage; themeSelect.value = currentTheme;
}
function persistSettings() { localStorage.setItem(settingsStorageKey, JSON.stringify({ language: currentLanguage, theme: currentTheme })); }
function applyTheme() { document.documentElement.dataset.theme = currentTheme === 'system' ? (systemThemeQuery.matches ? 'light' : 'dark') : currentTheme; }
function setStatus(el, message) { el.textContent = message; }
function setSmartthingsHelp(message = '') {
  if (!smartthingsHelp) return;
  smartthingsHelp.textContent = message;
  smartthingsHelp.classList.toggle('hidden', !message);
}

function activateTab(target) {
  tabButtons.forEach((item) => item.classList.toggle('active', item.dataset.tabTarget === target));
  tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
}
function toggleMenu(forceOpen) {
  const open = typeof forceOpen === 'boolean' ? forceOpen : !sideRail.classList.contains('open');
  sideRail.classList.toggle('open', open);
  menuToggleButton?.setAttribute('aria-expanded', String(open));
  if (menuBackdrop) menuBackdrop.hidden = !open;
}
function closeMenuOnMobile() {
  if (window.innerWidth <= 1080) toggleMenu(false);
}

const ensureQrLibrary = () => typeof window.QRCode !== 'undefined';
const ensureReaderLibrary = () => typeof window.jsQR !== 'undefined';
function getIterations() { const parsed = Number.parseInt(benchmarkIterationsInput.value, 10); const value = Number.isFinite(parsed) && parsed > 0 ? parsed : 100; benchmarkIterationsInput.value = String(value); return value; }

function qrOptions(width = Number(qrSize.value)) {
  const version = Number.parseInt(qrVersion.value, 10) || 0;
  return { width, margin: Number(qrMargin.value), errorCorrectionLevel: qrErrorLevel.value, version: version || undefined, color: { dark: qrColorDark.value, light: qrColorLight.value } };
}

function renderQr() {
  qrSizeLabel.textContent = `${t('sizeLabel')}: ${qrSize.value}px`;
  if (!ensureQrLibrary()) return;
  window.QRCode.toDataURL(qrInput.value || ' ', qrOptions(), (error, url) => {
    if (error) return;
    qrImage.src = url; qrImage.width = Number(qrSize.value); qrImage.height = Number(qrSize.value); downloadLink.href = url;
  });
}

async function decodeCanvas(width, height) {
  const context = qrCanvas.getContext('2d', { willReadFrequently: true }); context.drawImage(cameraPreview, 0, 0, width, height);
  if (typeof window.BarcodeDetector !== 'undefined') { barcodeDetector = barcodeDetector || new window.BarcodeDetector({ formats: ['qr_code'] }); const codes = await barcodeDetector.detect(qrCanvas); if (codes[0]?.rawValue) return { text: codes[0].rawValue, detector: 'BarcodeDetector' }; }
  if (!ensureReaderLibrary()) return null;
  const imageData = context.getImageData(0, 0, width, height); const decoded = window.jsQR(imageData.data, imageData.width, imageData.height); return decoded ? { text: decoded.data, detector: 'jsQR' } : null;
}

function renderBenchmarkResults(target, items) { target.classList.remove('empty-state'); target.innerHTML = items.map((item) => `<li><span>${item.label}</span><span>${item.meta}</span><span>${item.value}</span></li>`).join(''); }

async function runGenerationBenchmark() {
  if (!ensureQrLibrary()) return;
  const iterations = getIterations();
  const cases = [{ label: 'Short', value: 'Tool Box' }, { label: 'URL', value: qrInput.value || 'https://example.com' }, { label: 'Long', value: `${qrInput.value}\n`.repeat(4) }];
  const results = [];
  for (const item of cases) {
    const started = performance.now();
    for (let i = 0; i < iterations; i += 1) await window.QRCode.toDataURL(item.value || ' ', qrOptions(256));
    const duration = performance.now() - started;
    results.push({ label: item.label, meta: `${item.value.length} ${t('charsUnit')} · ${iterations}${t('iterationUnit')}`, value: `${t('avgLabel')} ${(duration / iterations).toFixed(2)} ms` });
  }
  renderBenchmarkResults(benchmarkList, results);
}

function startLiveScanLoop() {
  clearInterval(liveScanInterval);
  liveScanInterval = setInterval(async () => {
    if (!cameraStream || cameraPreview.readyState < 2) return;
    const width = cameraPreview.videoWidth; const height = cameraPreview.videoHeight; if (!width || !height) return;
    qrCanvas.width = width; qrCanvas.height = height;
    const decoded = await decodeCanvas(width, height);
    if (decoded?.text) { setStatus(qrReadResult, `${t('liveDetected')}: ${decoded.text}`); setStatus(cameraStatus, `${t('liveDetected')}: ${decoded.text} (${decoded.detector})`); }
  }, 350);
}
async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) return setStatus(cameraStatus, t('cameraUnsupported'));
  try {
    if (!cameraStream) cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    cameraPreview.srcObject = cameraStream; cameraPreview.classList.remove('hidden'); await cameraPreview.play(); setStatus(cameraStatus, t('cameraStarted')); setStatus(qrReadResult, t('liveWaiting')); startLiveScanLoop();
  } catch (error) { setStatus(cameraStatus, `${t('cameraStartFailed')}: ${error.message}`); }
}
function stopCamera() { clearInterval(liveScanInterval); if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop()); cameraStream = null; cameraPreview.srcObject = null; cameraPreview.classList.add('hidden'); setStatus(cameraStatus, t('cameraStopped')); }

async function runRealBenchmark() {
  if (!cameraStream) { realBenchmarkList.classList.add('empty-state'); realBenchmarkList.innerHTML = `<li>${t('realBenchmarkNeedCamera')}</li>`; return; }
  const iterations = getIterations(); const width = cameraPreview.videoWidth; const height = cameraPreview.videoHeight; let successCount = 0; let detectorName = 'jsQR'; const samples = [];
  realBenchmarkList.innerHTML = `<li>${t('realBenchmarkRunning')}...</li>`;
  for (let i = 0; i < iterations; i += 1) {
    const started = performance.now(); const decoded = await decodeCanvas(width, height); samples.push(performance.now() - started);
    if (decoded?.text) { successCount += 1; detectorName = decoded.detector; }
  }
  const avg = samples.reduce((s, v) => s + v, 0) / samples.length;
  renderBenchmarkResults(realBenchmarkList, [
    { label: t('realBenchmarkSuccess'), meta: `${successCount}/${iterations}`, value: `${((successCount / iterations) * 100).toFixed(1)}%` },
    { label: t('realBenchmarkFailure'), meta: `${iterations - successCount}/${iterations}`, value: `${(((iterations - successCount) / iterations) * 100).toFixed(1)}%` },
    { label: t('avgLabel'), meta: `${iterations}${t('iterationUnit')}`, value: `${avg.toFixed(2)} ms` },
    { label: t('realBenchmarkDetector'), meta: detectorName, value: 'camera frame loop' },
  ]);
}

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0]; if (!file || !ensureReaderLibrary()) return;
  const image = new Image(); const objectUrl = URL.createObjectURL(file);
  image.onload = () => { const context = qrCanvas.getContext('2d'); qrCanvas.width = image.width; qrCanvas.height = image.height; context.drawImage(image, 0, 0); const imageData = context.getImageData(0, 0, image.width, image.height); const decoded = window.jsQR(imageData.data, imageData.width, imageData.height); setStatus(qrReadResult, decoded ? decoded.data : 'No QR code found'); URL.revokeObjectURL(objectUrl); };
  image.onerror = () => URL.revokeObjectURL(objectUrl); image.src = objectUrl;
});

function formatReadingTime(seconds) { return seconds < 60 ? `${Math.ceil(seconds)}s` : `${Math.ceil(seconds / 60)}m`; }
function updateTextStats() {
  const value = textInput.value; const words = value.trim().match(/\S+/g) || []; const sentences = value.match(/[.!?]+(?=\s|$)/g) || []; const paragraphs = value.trim() ? value.trim().split(/\n\s*\n/).length : 0;
  charCount.textContent = value.length; byteCount.textContent = encoder.encode(value).length; lineCount.textContent = value.length ? value.split(/\n/).length : 0; trimmedCount.textContent = value.replace(/\s/g, '').length;
  wordCount.textContent = words.length; sentenceCount.textContent = sentences.length; paragraphCount.textContent = paragraphs; readingTime.textContent = formatReadingTime(words.length / 3.3);
}

function normalizeJsonInput(raw) {
  const value = raw.trim();
  if (!value) return '';

  const isJsonFragment = /^"[^"\\]*(?:\\.[^"\\]*)*"\s*:/.test(value) || /^[A-Za-z_$][\w$]*\s*:/.test(value);
  if (isJsonFragment) return `{${value}}`;

  if (/^[{\[]/.test(value) || /^-?\d/.test(value) || /^"(?:[^"\\]|\\.)*"$/.test(value) || /^(true|false|null)$/i.test(value)) return value;

  return JSON.stringify(value);
}
function updateJsonViewer() {
  try {
    const normalized = normalizeJsonInput(jsonInput.value);
    const formatted = JSON.stringify(JSON.parse(normalized), null, 2);
    jsonOutput.innerHTML = toHighlightedJson(formatted); jsonOutput.classList.remove('hidden'); jsonError.classList.add('hidden');
  } catch (error) {
    jsonOutput.innerHTML = ''; jsonOutput.classList.add('hidden'); jsonError.classList.remove('hidden'); jsonErrorText.textContent = error.message;
  }
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
function toHighlightedJson(formatted) {
  return escapeHtml(formatted).replace(/("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?)|\b(true|false|null)\b/g, (matched, quoted, keySuffix, number, keyword) => {
    if (quoted && keySuffix) return `<span class="json-key">${quoted}</span>${keySuffix}`;
    if (quoted) return `<span class="json-string">${quoted}</span>`;
    if (number) return `<span class="json-number">${number}</span>`;
    if (keyword) return `<span class="json-keyword">${keyword}</span>`;
    return matched;
  });
}

function editText(transformer) {
  textInput.value = transformer(textInput.value);
  updateTextStats();
}
function trimLines(value) { return value.split('\n').map((line) => line.trim()).join('\n'); }
function removeEmptyLines(value) { return value.split('\n').filter((line) => line.trim()).join('\n'); }
function dedupeLines(value) {
  const seen = new Set();
  return value.split('\n').filter((line) => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  }).join('\n');
}
function sortLines(value) { return value.split('\n').sort((a, b) => a.localeCompare(b)).join('\n'); }
function parseJsonOrThrow() { return JSON.parse(normalizeJsonInput(jsonInput.value)); }
function setJsonValue(value) { jsonInput.value = value; updateJsonViewer(); }

async function extractSmartThingsTpk() {
  const url = cosmosUrlInput.value.trim();
  if (!url) return;
  smartthingsStatus.dataset.busy = 'true';
  extractTpkButton.disabled = true;
  setStatus(smartthingsStatus, `${t('smartStatusPreparing')} ${url}`);
  downloadTpkLink.classList.add('hidden');
  setSmartthingsHelp('');
  try {
    setStatus(smartthingsStatus, t('smartStatusExtracting'));
    const response = await fetch('/api/smartthings/extract-tpk', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cosmosUrl: url }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Extraction failed');
    downloadTpkLink.href = result.downloadPath;
    downloadTpkLink.download = result.fileName;
    downloadTpkLink.classList.remove('hidden');
    setStatus(smartthingsStatus, `${t('smartStatusDone')}: ${result.fileName}`);
  } catch (error) {
    const message = String(error.message || error);
    setStatus(smartthingsStatus, `${t('smartStatusError')}: ${message}`);
    if (/Windows에서는 기본 CMD\/Powershell/i.test(message) || (/rpm2cpio\/cpio/.test(message) && /Windows/i.test(message))) {
      setSmartthingsHelp(t('smartWindowsHint'));
    }
  } finally {
    extractTpkButton.disabled = false;
    delete smartthingsStatus.dataset.busy;
  }
}

function selectedNewsIds() {
  return [...document.querySelectorAll('.news-select:checked')].map((item) => item.value);
}

async function loadNewsState() {
  const response = await fetch('/api/private/news');
  const state = await response.json();
  newsItems = Array.isArray(state.items) ? state.items : [];
  newsScheduleMinutesInput.value = String(state.scheduleMinutes || 0);
  renderNewsList();
  setStatus(newsStatusText, state.lastCollectedAt ? `마지막 수집: ${new Date(state.lastCollectedAt).toLocaleString()}` : '준비됨');
}

function renderNewsList() {
  if (!newsList) return;
  if (!newsItems.length) {
    newsList.innerHTML = '<li class="news-item empty-state"><p>수집된 뉴스가 없습니다.</p></li>';
    return;
  }
  newsList.innerHTML = newsItems.map((item) => `
    <li class="news-item" data-id="${item.id}">
      <label><input type="checkbox" class="news-select" value="${item.id}" /></label>
      <input class="news-edit-input" data-field="date" value="${item.date || ''}" />
      <input class="news-edit-input" data-field="title" value="${escapeHtml(item.title || '').replaceAll('"', '&quot;')}" />
      <textarea class="news-edit-textarea" data-field="body" rows="3">${escapeHtml(item.body || '')}</textarea>
      <input class="news-edit-input" data-field="source" value="${escapeHtml(item.source || '').replaceAll('"', '&quot;')}" />
      <button class="news-save-button" type="button">수정 저장</button>
    </li>
  `).join('');
}

async function saveNewsSchedule() {
  const scheduleMinutes = Math.max(0, Number.parseInt(newsScheduleMinutesInput.value, 10) || 0);
  const response = await fetch('/api/private/news/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scheduleMinutes }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '일정 저장 실패');
  setStatus(newsStatusText, `수집 주기 저장 완료: ${scheduleMinutes}분`);
}

async function collectNewsNow() {
  const response = await fetch('/api/private/news/collect', { method: 'POST' });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '뉴스 수집 실패');
  newsItems = result.items || [];
  renderNewsList();
  setStatus(newsStatusText, `수집 완료: ${new Date(result.lastCollectedAt).toLocaleString()}`);
}

async function deleteSelectedNews() {
  const ids = selectedNewsIds();
  if (!ids.length) return;
  const response = await fetch('/api/private/news', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '선택 삭제 실패');
  newsItems = result.items || [];
  renderNewsList();
  setStatus(newsStatusText, `${ids.length}개 뉴스 삭제 완료`);
}

function exportSelectedNewsAsJson() {
  const ids = new Set(selectedNewsIds());
  if (!ids.size) return;
  const selected = newsItems.filter((item) => ids.has(item.id));
  const blob = new Blob([JSON.stringify(selected, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `news-selected-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function saveEditedNewsItem(listItem) {
  const id = listItem.dataset.id;
  const payload = {
    date: listItem.querySelector('[data-field="date"]').value,
    title: listItem.querySelector('[data-field="title"]').value,
    body: listItem.querySelector('[data-field="body"]').value,
    source: listItem.querySelector('[data-field="source"]').value,
  };
  const response = await fetch(`/api/private/news/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || '뉴스 수정 실패');
  newsItems = newsItems.map((item) => (item.id === id ? result : item));
  setStatus(newsStatusText, `뉴스 수정 완료: ${result.title}`);
}

tabButtons.forEach((button) => button.addEventListener('click', () => {
  activateTab(button.dataset.tabTarget);
  closeMenuOnMobile();
}));
subTabButtons.forEach((button) => button.addEventListener('click', () => {
  const target = button.dataset.subTabTarget; subTabButtons.forEach((item) => item.classList.toggle('active', item === button)); subTabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.subTabPanel === target));
}));

benchmarkButton.addEventListener('click', runGenerationBenchmark); realBenchmarkButton.addEventListener('click', runRealBenchmark); cameraStartButton.addEventListener('click', startCamera); cameraStopButton.addEventListener('click', stopCamera);
qrInput.addEventListener('input', renderQr); qrSize.addEventListener('input', renderQr); qrErrorLevel.addEventListener('change', renderQr); qrMargin.addEventListener('input', renderQr); qrVersion.addEventListener('change', renderQr); qrColorDark.addEventListener('input', renderQr); qrColorLight.addEventListener('input', renderQr);
textInput.addEventListener('input', updateTextStats); jsonInput.addEventListener('input', updateJsonViewer); extractTpkButton.addEventListener('click', extractSmartThingsTpk);
newsScheduleSaveButton?.addEventListener('click', async () => {
  try { await saveNewsSchedule(); } catch (error) { setStatus(newsStatusText, `오류: ${error.message}`); }
});
newsCollectNowButton?.addEventListener('click', async () => {
  try { await collectNewsNow(); } catch (error) { setStatus(newsStatusText, `오류: ${error.message}`); }
});
newsDeleteSelectedButton?.addEventListener('click', async () => {
  try { await deleteSelectedNews(); } catch (error) { setStatus(newsStatusText, `오류: ${error.message}`); }
});
newsExportSelectedButton?.addEventListener('click', exportSelectedNewsAsJson);
newsList?.addEventListener('click', async (event) => {
  const saveButton = event.target.closest('.news-save-button');
  if (!saveButton) return;
  const listItem = saveButton.closest('.news-item');
  if (!listItem) return;
  try { await saveEditedNewsItem(listItem); } catch (error) { setStatus(newsStatusText, `오류: ${error.message}`); }
});
textTrimLinesButton.addEventListener('click', () => editText(trimLines));
textRemoveEmptyButton.addEventListener('click', () => editText(removeEmptyLines));
textDedupeLinesButton.addEventListener('click', () => editText(dedupeLines));
textSortLinesButton.addEventListener('click', () => editText(sortLines));
textUpperButton.addEventListener('click', () => editText((value) => value.toUpperCase()));
textLowerButton.addEventListener('click', () => editText((value) => value.toLowerCase()));
jsonFormatButton.addEventListener('click', () => {
  try { setJsonValue(JSON.stringify(parseJsonOrThrow(), null, 2)); } catch (error) { jsonError.classList.remove('hidden'); jsonErrorText.textContent = error.message; }
});
jsonMinifyButton.addEventListener('click', () => {
  try { setJsonValue(JSON.stringify(parseJsonOrThrow())); } catch (error) { jsonError.classList.remove('hidden'); jsonErrorText.textContent = error.message; }
});
jsonCopyButton.addEventListener('click', async () => {
  const value = jsonOutput.textContent || '';
  if (!value || !navigator.clipboard) return;
  await navigator.clipboard.writeText(value);
});
languageSelect.addEventListener('change', () => { currentLanguage = languageSelect.value; persistSettings(); applyTranslations(); });
menuToggleButton?.addEventListener('click', () => toggleMenu());
menuBackdrop?.addEventListener('click', () => toggleMenu(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleMenu(false); });
window.addEventListener('resize', () => {
  if (window.innerWidth > 1080) {
    sideRail.classList.remove('open');
    menuBackdrop.hidden = true;
    menuToggleButton?.setAttribute('aria-expanded', 'false');
  }
});
quickQrButton?.addEventListener('click', () => {
  activateTab('qr');
  qrInput.value = qrInput.value || window.location.href;
  renderQr();
  closeMenuOnMobile();
});
quickTextButton?.addEventListener('click', () => { activateTab('text'); textInput.focus(); closeMenuOnMobile(); });
quickJsonButton?.addEventListener('click', () => {
  activateTab('json');
  try { setJsonValue(JSON.stringify(parseJsonOrThrow(), null, 2)); } catch {}
  closeMenuOnMobile();
});
quickSmartthingsButton?.addEventListener('click', () => { activateTab('smartthings'); closeMenuOnMobile(); });
quickPrivateButton?.addEventListener('click', () => { activateTab('private'); closeMenuOnMobile(); });
themeSelect.addEventListener('change', () => { currentTheme = themeSelect.value; persistSettings(); applyTheme(); });
systemThemeQuery.addEventListener('change', () => { if (currentTheme === 'system') applyTheme(); });
window.addEventListener('beforeunload', stopCamera);
window.addEventListener('load', async () => {
  loadSettings(); applyTheme(); applyTranslations(); updateTextStats(); updateJsonViewer(); await new Promise((r) => setTimeout(r, 80)); renderQr();
  await loadNewsState().catch(() => setStatus(newsStatusText, '뉴스 상태를 불러오지 못했습니다.'));
});
