const translations = {
  ko: {
    heroTitle: '여러 기능을 상단 탭으로 실행하는 Tool Box',
    heroCopy: 'QR maker & reader + benchmarking, 텍스트 글자/바이트 카운터, JSON pretty viewer를 하나의 로컬 페이지로 구성했습니다.',
    settingsTitle: '설정',
    languageLabel: '언어',
    themeLabel: '테마',
    themeDark: '다크',
    themeLight: '라이트',
    themeSystem: '시스템',
    tabQr: 'QR 도구',
    tabText: '텍스트 카운터',
    tabJson: 'JSON Pretty Viewer',
    qrToolTitle: 'QR Maker & Reader',
    qrContentLabel: 'QR 내용',
    iterationLabel: '반복 횟수',
    benchmarkButton: '벤치마킹 실행',
    realBenchmarkButton: '리얼 벤치마킹 실행',
    downloadButton: 'PNG 다운로드',
    uploadLabel: 'QR 이미지 업로드',
    cameraStartButton: '카메라 열기',
    cameraStopButton: '카메라 닫기',
    readerResultTitle: '리더 결과',
    cameraStatusTitle: '카메라 상태',
    previewBenchmarkTitle: 'Preview & Benchmark',
    benchmarkResultTitle: '벤치마킹 결과',
    realBenchmarkResultTitle: '리얼 벤치마킹 결과',
    benchmarkPlaceholder: '버튼을 누르면 서로 다른 payload 기준 QR 생성 시간을 측정합니다.',
    realBenchmarkPlaceholder: '카메라를 연 뒤 버튼을 누르면 실제 카메라 프레임으로 QR 인식 성능을 반복 측정합니다.',
    textTitle: '글자수 / 바이트수 확인',
    textInputLabel: '텍스트 입력',
    charCount: '글자수',
    byteCount: '바이트수 (UTF-8)',
    lineCount: '줄 수',
    trimmedCount: '공백 제외',
    jsonInputTitle: 'JSON 입력',
    jsonRawLabel: '원본 JSON',
    jsonPrettyTitle: 'Pretty Viewer',
    jsonErrorTitle: '파싱 오류',
    sizeLabel: '사이즈',
    readerPlaceholder: '업로드한 이미지의 QR을 읽으면 결과가 여기에 표시됩니다.',
    cameraPlaceholder: '카메라를 열면 실시간 QR 확인과 리얼 벤치마킹을 실행할 수 있습니다.',
    qrLibraryMissing: 'QR 라이브러리를 아직 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
    qrReaderLibraryMissing: 'QR 리더 라이브러리를 아직 불러오지 못했습니다.',
    qrGenerateError: 'QR 생성 오류',
    benchmarkLibraryMissing: 'QR 라이브러리를 불러오지 못해 벤치마킹을 실행할 수 없습니다.',
    benchmarkCaseShort: '짧은 텍스트',
    benchmarkCaseUrl: 'URL',
    benchmarkCaseLong: '긴 문장',
    charsUnit: 'chars',
    iterationUnit: '회',
    avgLabel: '평균',
    totalLabel: '총합',
    benchmarkDone: '생성 벤치마킹 완료',
    uploadDecodeMissing: 'QR 리더 라이브러리를 아직 불러오지 못했습니다.',
    uploadDecodeFail: 'QR 코드를 찾지 못했습니다. 다른 이미지를 시도해 주세요.',
    uploadImageFail: '이미지를 불러오지 못했습니다. 파일 형식을 확인해 주세요.',
    cameraUnsupported: '이 브라우저에서는 카메라 API를 지원하지 않습니다.',
    cameraStarted: '카메라가 열렸습니다. 생성된 QR을 비추고 리얼 벤치마킹을 실행해 보세요.',
    cameraStartFailed: '카메라를 열지 못했습니다.',
    cameraStopped: '카메라가 중지되었습니다.',
    liveDetected: '실시간 인식 결과',
    liveWaiting: '카메라 프레임에서 QR을 찾는 중입니다.',
    realBenchmarkNeedCamera: '리얼 벤치마킹을 실행하려면 먼저 카메라를 열어 주세요.',
    realBenchmarkRunning: '리얼 벤치마킹 실행 중',
    realBenchmarkSuccess: '성공',
    realBenchmarkFailure: '실패',
    realBenchmarkDetector: '디코더',
    realBenchmarkCompleted: '리얼 벤치마킹 완료',
    realBenchmarkCameraHint: '생성된 QR 이미지를 카메라에 비추면 성공률을 확인할 수 있습니다.',
  },
  en: {
    heroTitle: 'Tool Box with tabbed utilities',
    heroCopy: 'A single local page for QR maker & reader + benchmarking, text character/byte counts, and a JSON pretty viewer.',
    settingsTitle: 'Settings',
    languageLabel: 'Language',
    themeLabel: 'Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    themeSystem: 'System',
    tabQr: 'QR Tools',
    tabText: 'Text Counter',
    tabJson: 'JSON Pretty Viewer',
    qrToolTitle: 'QR Maker & Reader',
    qrContentLabel: 'QR content',
    iterationLabel: 'Iterations',
    benchmarkButton: 'Run benchmark',
    realBenchmarkButton: 'Run real benchmark',
    downloadButton: 'Download PNG',
    uploadLabel: 'Upload QR image',
    cameraStartButton: 'Open camera',
    cameraStopButton: 'Close camera',
    readerResultTitle: 'Reader result',
    cameraStatusTitle: 'Camera status',
    previewBenchmarkTitle: 'Preview & Benchmark',
    benchmarkResultTitle: 'Benchmark results',
    realBenchmarkResultTitle: 'Real benchmark results',
    benchmarkPlaceholder: 'Click the button to measure QR generation time across payload types.',
    realBenchmarkPlaceholder: 'Open the camera, then measure repeated QR detection performance on live frames.',
    textTitle: 'Character / byte counter',
    textInputLabel: 'Text input',
    charCount: 'Characters',
    byteCount: 'Bytes (UTF-8)',
    lineCount: 'Lines',
    trimmedCount: 'Without spaces',
    jsonInputTitle: 'JSON input',
    jsonRawLabel: 'Raw JSON',
    jsonPrettyTitle: 'Pretty Viewer',
    jsonErrorTitle: 'Parse error',
    sizeLabel: 'Size',
    readerPlaceholder: 'When you upload an image, the decoded QR result will appear here.',
    cameraPlaceholder: 'Open the camera to inspect live QR detection and run the real benchmark.',
    qrLibraryMissing: 'The QR library is not loaded yet. Please try again in a moment.',
    qrReaderLibraryMissing: 'The QR reader library is not loaded yet.',
    qrGenerateError: 'QR generation error',
    benchmarkLibraryMissing: 'Benchmarking cannot run because the QR library failed to load.',
    benchmarkCaseShort: 'Short text',
    benchmarkCaseUrl: 'URL',
    benchmarkCaseLong: 'Long text',
    charsUnit: 'chars',
    iterationUnit: 'runs',
    avgLabel: 'Average',
    totalLabel: 'Total',
    benchmarkDone: 'Generation benchmark complete',
    uploadDecodeMissing: 'The QR reader library is not loaded yet.',
    uploadDecodeFail: 'No QR code was found. Please try another image.',
    uploadImageFail: 'The image could not be loaded. Please check the file format.',
    cameraUnsupported: 'This browser does not support the camera API.',
    cameraStarted: 'Camera is open. Point it at the generated QR code and try the real benchmark.',
    cameraStartFailed: 'Failed to open the camera.',
    cameraStopped: 'Camera stopped.',
    liveDetected: 'Live detection result',
    liveWaiting: 'Waiting for a QR code in the live camera frame.',
    realBenchmarkNeedCamera: 'Open the camera before running the real benchmark.',
    realBenchmarkRunning: 'Running real benchmark',
    realBenchmarkSuccess: 'Success',
    realBenchmarkFailure: 'Failure',
    realBenchmarkDetector: 'Decoder',
    realBenchmarkCompleted: 'Real benchmark complete',
    realBenchmarkCameraHint: 'Show the generated QR image to the camera to verify the success rate.',
  },
};

const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
const qrInput = document.getElementById('qr-input');
const qrSize = document.getElementById('qr-size');
const qrSizeLabel = document.getElementById('qr-size-label');
const qrImage = document.getElementById('qr-image');
const downloadLink = document.getElementById('download-link');
const benchmarkButton = document.getElementById('benchmark-button');
const benchmarkList = document.getElementById('benchmark-list');
const realBenchmarkButton = document.getElementById('real-benchmark-button');
const realBenchmarkList = document.getElementById('real-benchmark-list');
const benchmarkIterationsInput = document.getElementById('benchmark-iterations');
const uploadInput = document.getElementById('qr-upload');
const qrReadResult = document.getElementById('qr-read-result');
const qrCanvas = document.getElementById('qr-canvas');
const cameraPreview = document.getElementById('camera-preview');
const cameraStartButton = document.getElementById('camera-start-button');
const cameraStopButton = document.getElementById('camera-stop-button');
const cameraStatus = document.getElementById('camera-status');
const languageSelect = document.getElementById('language-select');
const themeSelect = document.getElementById('theme-select');
const textInput = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
const byteCount = document.getElementById('byte-count');
const lineCount = document.getElementById('line-count');
const trimmedCount = document.getElementById('trimmed-count');
const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const jsonError = document.getElementById('json-error');
const jsonErrorText = jsonError.querySelector('p');

const encoder = new TextEncoder();
const settingsStorageKey = 'tool-box-settings';
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');

let currentLanguage = 'ko';
let currentTheme = 'dark';
let cameraStream = null;
let liveScanInterval = null;
let barcodeDetector = null;

function t(key) {
  return translations[currentLanguage][key] || translations.ko[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });
  updateSizeLabel();
  if (!qrReadResult.dataset.userUpdated) qrReadResult.textContent = t('readerPlaceholder');
  if (!cameraStatus.dataset.userUpdated) cameraStatus.textContent = t('cameraPlaceholder');
}

function loadSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(settingsStorageKey) || '{}');
    currentLanguage = saved.language || 'ko';
    currentTheme = saved.theme || 'dark';
  } catch {
    currentLanguage = 'ko';
    currentTheme = 'dark';
  }
  languageSelect.value = currentLanguage;
  themeSelect.value = currentTheme;
}

function persistSettings() {
  window.localStorage.setItem(
    settingsStorageKey,
    JSON.stringify({ language: currentLanguage, theme: currentTheme }),
  );
}

function applyTheme() {
  const effectiveTheme = currentTheme === 'system' ? (systemThemeQuery.matches ? 'light' : 'dark') : currentTheme;
  document.documentElement.dataset.theme = effectiveTheme;
}

function updateSizeLabel() {
  qrSizeLabel.textContent = `${t('sizeLabel')}: ${qrSize.value}px`;
}

function setStatus(element, message) {
  element.textContent = message;
  element.dataset.userUpdated = 'true';
}

function ensureQrLibrary() {
  return typeof window.QRCode !== 'undefined';
}

function ensureReaderLibrary() {
  return typeof window.jsQR !== 'undefined';
}

function getIterations() {
  const parsed = Number.parseInt(benchmarkIterationsInput.value, 10);
  const value = Number.isFinite(parsed) && parsed > 0 ? parsed : 100;
  benchmarkIterationsInput.value = String(value);
  return value;
}

async function renderQr() {
  updateSizeLabel();

  if (!ensureQrLibrary()) {
    setStatus(qrReadResult, t('qrLibraryMissing'));
    return;
  }

  window.QRCode.toDataURL(
    qrInput.value || ' ',
    {
      width: Number(qrSize.value),
      margin: 2,
      color: { dark: '#111827', light: '#ffffff' },
    },
    (error, url) => {
      if (error) {
        setStatus(qrReadResult, `${t('qrGenerateError')}: ${error.message}`);
        return;
      }
      qrImage.src = url;
      qrImage.width = Number(qrSize.value);
      qrImage.height = Number(qrSize.value);
      downloadLink.href = url;
    },
  );
}

async function decodeCanvas(width, height) {
  const context = qrCanvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(cameraPreview, 0, 0, width, height);

  if (typeof window.BarcodeDetector !== 'undefined') {
    barcodeDetector = barcodeDetector || new window.BarcodeDetector({ formats: ['qr_code'] });
    const codes = await barcodeDetector.detect(qrCanvas);
    if (codes[0]?.rawValue) {
      return { text: codes[0].rawValue, detector: 'BarcodeDetector' };
    }
  }

  if (!ensureReaderLibrary()) {
    return null;
  }

  const imageData = context.getImageData(0, 0, width, height);
  const decoded = window.jsQR(imageData.data, imageData.width, imageData.height);
  return decoded ? { text: decoded.data, detector: 'jsQR' } : null;
}

function renderBenchmarkResults(target, items) {
  target.classList.remove('empty-state');
  target.innerHTML = items
    .map((item) => `<li><span>${item.label}</span><span>${item.meta}</span><span>${item.value}</span></li>`)
    .join('');
}

async function runGenerationBenchmark() {
  if (!ensureQrLibrary()) {
    benchmarkList.innerHTML = `<li>${t('benchmarkLibraryMissing')}</li>`;
    benchmarkList.classList.add('empty-state');
    return;
  }

  const iterations = getIterations();
  const cases = [
    { label: t('benchmarkCaseShort'), value: 'Tool Box' },
    { label: t('benchmarkCaseUrl'), value: qrInput.value || 'https://example.com/tool-box' },
    { label: t('benchmarkCaseLong'), value: `${qrInput.value}\n${qrInput.value}\n${qrInput.value}`.trim() },
  ];

  const results = [];
  for (const item of cases) {
    const started = performance.now();
    for (let index = 0; index < iterations; index += 1) {
      await window.QRCode.toDataURL(item.value || ' ', { width: 256, margin: 1 });
    }
    const duration = performance.now() - started;
    results.push({
      label: item.label,
      meta: `${item.value.length} ${t('charsUnit')} · ${iterations}${t('iterationUnit')}`,
      value: `${t('avgLabel')} ${(duration / iterations).toFixed(2)} ms`,
    });
  }

  results.push({
    label: t('benchmarkDone'),
    meta: `${iterations}${t('iterationUnit')}`,
    value: t('totalLabel'),
  });
  renderBenchmarkResults(benchmarkList, results);
}

function startLiveScanLoop() {
  window.clearInterval(liveScanInterval);
  liveScanInterval = window.setInterval(async () => {
    if (!cameraStream || cameraPreview.readyState < 2) return;
    const width = cameraPreview.videoWidth;
    const height = cameraPreview.videoHeight;
    if (!width || !height) return;
    qrCanvas.width = width;
    qrCanvas.height = height;
    const decoded = await decodeCanvas(width, height);
    if (decoded?.text) {
      setStatus(qrReadResult, `${t('liveDetected')}: ${decoded.text}`);
      setStatus(cameraStatus, `${t('liveDetected')}: ${decoded.text} (${decoded.detector})`);
    }
  }, 500);
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus(cameraStatus, t('cameraUnsupported'));
    return;
  }

  try {
    if (cameraStream) {
      startLiveScanLoop();
      return;
    }
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    cameraPreview.srcObject = cameraStream;
    cameraPreview.classList.remove('hidden');
    await cameraPreview.play();
    setStatus(cameraStatus, t('cameraStarted'));
    setStatus(qrReadResult, t('liveWaiting'));
    startLiveScanLoop();
  } catch (error) {
    setStatus(cameraStatus, `${t('cameraStartFailed')}: ${error.message}`);
  }
}

function stopCamera() {
  window.clearInterval(liveScanInterval);
  liveScanInterval = null;
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
  cameraPreview.srcObject = null;
  cameraPreview.classList.add('hidden');
  setStatus(cameraStatus, t('cameraStopped'));
}

async function runRealBenchmark() {
  if (!cameraStream) {
    realBenchmarkList.classList.add('empty-state');
    realBenchmarkList.innerHTML = `<li>${t('realBenchmarkNeedCamera')}</li>`;
    return;
  }

  const iterations = getIterations();
  const width = cameraPreview.videoWidth;
  const height = cameraPreview.videoHeight;
  const samples = [];
  let successCount = 0;
  let detectorName = 'jsQR';

  realBenchmarkList.classList.remove('empty-state');
  realBenchmarkList.innerHTML = `<li>${t('realBenchmarkRunning')}...</li>`;

  for (let index = 0; index < iterations; index += 1) {
    const started = performance.now();
    const decoded = await decodeCanvas(width, height);
    const duration = performance.now() - started;
    samples.push(duration);
    if (decoded?.text) {
      successCount += 1;
      detectorName = decoded.detector;
      setStatus(qrReadResult, `${t('liveDetected')}: ${decoded.text}`);
    }
  }

  const total = samples.reduce((sum, value) => sum + value, 0);
  const avg = samples.length ? total / samples.length : 0;
  renderBenchmarkResults(realBenchmarkList, [
    {
      label: t('realBenchmarkSuccess'),
      meta: `${successCount}/${iterations}`,
      value: `${((successCount / iterations) * 100).toFixed(1)}%`,
    },
    {
      label: t('realBenchmarkFailure'),
      meta: `${iterations - successCount}/${iterations}`,
      value: `${(iterations > 0 ? (((iterations - successCount) / iterations) * 100) : 0).toFixed(1)}%`,
    },
    {
      label: t('avgLabel'),
      meta: `${iterations}${t('iterationUnit')}`,
      value: `${avg.toFixed(2)} ms`,
    },
    {
      label: t('realBenchmarkDetector'),
      meta: detectorName,
      value: t('realBenchmarkCameraHint'),
    },
  ]);
  setStatus(cameraStatus, `${t('realBenchmarkCompleted')}: ${successCount}/${iterations}, ${t('avgLabel')} ${avg.toFixed(2)} ms`);
}

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!ensureReaderLibrary()) {
    setStatus(qrReadResult, t('uploadDecodeMissing'));
    return;
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  image.onload = () => {
    const context = qrCanvas.getContext('2d');
    qrCanvas.width = image.width;
    qrCanvas.height = image.height;
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const decoded = window.jsQR(imageData.data, imageData.width, imageData.height);
    setStatus(qrReadResult, decoded ? decoded.data : t('uploadDecodeFail'));
    URL.revokeObjectURL(objectUrl);
  };

  image.onerror = () => {
    setStatus(qrReadResult, t('uploadImageFail'));
    URL.revokeObjectURL(objectUrl);
  };

  image.src = objectUrl;
});

function updateTextStats() {
  const value = textInput.value;
  charCount.textContent = value.length;
  byteCount.textContent = encoder.encode(value).length;
  lineCount.textContent = value.length === 0 ? 0 : value.split(/\n/).length;
  trimmedCount.textContent = value.replace(/\s/g, '').length;
}

function updateJsonViewer() {
  try {
    const formatted = JSON.stringify(JSON.parse(jsonInput.value), null, 2);
    jsonOutput.textContent = formatted;
    jsonOutput.classList.remove('hidden');
    jsonError.classList.add('hidden');
  } catch (error) {
    jsonOutput.textContent = '';
    jsonOutput.classList.add('hidden');
    jsonError.classList.remove('hidden');
    jsonErrorText.textContent = error.message;
  }
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tabTarget;
    tabButtons.forEach((item) => item.classList.toggle('active', item === button));
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
  });
});

benchmarkButton.addEventListener('click', runGenerationBenchmark);
realBenchmarkButton.addEventListener('click', runRealBenchmark);
cameraStartButton.addEventListener('click', startCamera);
cameraStopButton.addEventListener('click', stopCamera);
qrInput.addEventListener('input', renderQr);
qrSize.addEventListener('input', renderQr);
textInput.addEventListener('input', updateTextStats);
jsonInput.addEventListener('input', updateJsonViewer);
languageSelect.addEventListener('change', () => {
  currentLanguage = languageSelect.value;
  persistSettings();
  applyTranslations();
});
themeSelect.addEventListener('change', () => {
  currentTheme = themeSelect.value;
  persistSettings();
  applyTheme();
});
systemThemeQuery.addEventListener('change', () => {
  if (currentTheme === 'system') applyTheme();
});
window.addEventListener('beforeunload', stopCamera);
window.addEventListener('load', async () => {
  loadSettings();
  applyTheme();
  applyTranslations();
  updateTextStats();
  updateJsonViewer();
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  renderQr();
});
