const translations = {
  ko: {
    hero_eyebrow: 'Local npm toolbox',
    hero_title: '실무형 유틸리티를 세련된 탭 UI로 묶은 Tool Box',
    hero_copy: 'QR 생성/스캔/카메라 확인, 텍스트 분석, JSON pretty viewer, SmartThings TV 추출 도구까지 한 화면에서 빠르게 실행할 수 있습니다.',
    settings_kicker: 'Settings',
    settings_title: '환경 설정',
    language_label: '언어',
    theme_label: '테마',
    tab_qr: 'QR 도구',
    tab_text: '텍스트 카운터',
    tab_json: 'JSON Pretty Viewer',
    qr_title: 'QR Maker & Reader',
    qr_payload: 'QR 내용',
    qr_error_level: '에러 보정',
    qr_output_format: '출력 포맷',
    qr_options: '옵션',
    qr_include_bg: '배경색 포함',
    benchmark_iterations: '반복 횟수',
    run_benchmark: '벤치마킹 실행',
    run_real_benchmark: '리얼 벤치마킹 실행',
    download_qr: 'QR 다운로드',
    upload_qr_image: '이미지로 QR 읽기',
    camera_scan: '카메라 스캔',
    open_camera: '카메라 열기',
    close_camera: '카메라 닫기',
    reader_result: '리더 결과',
    preview_title: 'Preview',
    char_count_label: '문자 수',
    current_format: '현재 포맷',
    correction_level: '보정 수준',
    camera_preview: 'Camera Preview',
    benchmark_title: 'Benchmark',
    real_benchmark_title: 'Real Camera Benchmark',
    attempts: '시도 횟수',
    successes: '성공 수',
    avg_time: '평균 시간',
    text_counter_title: '텍스트 카운터',
    text_input: '텍스트 입력',
    normalize_space: '공백 정리',
    copy: '복사',
    clear: '비우기',
    byte_count_label: '바이트수 (UTF-8)',
    line_count_label: '줄 수',
    trimmed_count_label: '공백 제외',
    word_count_label: '단어 수',
    paragraph_count_label: '문단 수',
    reading_time_label: '읽기 시간',
    copy_status_label: '최근 복사 상태',
    text_suggestion_title: '추가 기능 제안도 반영',
    text_feature_1: '단어 수, 문단 수, 읽기 시간 계산',
    text_feature_2: '공백 정리 버튼으로 붙여넣은 텍스트 정돈',
    text_feature_3: '원문 복사 버튼으로 메신저/문서 전달 전 체크',
    json_title: '입력 JSON / 문자열 처리',
    json_raw_input: '원본 입력',
    json_helper: '객체/배열뿐 아니라 "hello", 123, true, 일반 텍스트도 보기 좋게 변환합니다.',
    json_type: '해석 타입',
    json_length: '입력 길이',
    json_status: '상태',
    parse_error: '파싱 오류',
    smartthings_title: '아티팩트 기반 TPK 추출',
    extract_tpk: 'TPK 추출 시작',
    how_it_works: '동작 방식',
    smartthings_helper: '입력 URL에서 repos/product/armv7l/packages/armv7l/ 경로를 구성하고, rpm 목록을 확인한 뒤 SmartThings TPK를 포함한 rpm을 내려받아 내부 payload에서 usr/apps/.preload-rw-tpk 경로의 tpk를 추출합니다.',
    extract_log: '추출 로그',
    notes: '주의 사항',
    smartthings_note_1: '대상 서버 접근 권한이 없으면 403 등의 오류가 표시될 수 있습니다.',
    smartthings_note_2: 'rpm 포맷은 xz/gzip payload를 지원하도록 구현했습니다.',
    smartthings_note_3: '발견한 첫 번째 SmartThings TPK를 자동 다운로드합니다.',
  },
  en: {
    hero_eyebrow: 'Local npm toolbox',
    hero_title: 'A polished Tool Box for practical utilities',
    hero_copy: 'Run QR generation/scanning/camera checks, text analysis, JSON pretty viewing, and SmartThings TV extraction from one local workspace.',
    settings_kicker: 'Settings',
    settings_title: 'Preferences',
    language_label: 'Language',
    theme_label: 'Theme',
    tab_qr: 'QR Tools',
    tab_text: 'Text Counter',
    tab_json: 'JSON Pretty Viewer',
    qr_title: 'QR Maker & Reader',
    qr_payload: 'QR payload',
    qr_error_level: 'Error correction',
    qr_output_format: 'Output format',
    qr_options: 'Options',
    qr_include_bg: 'Include background',
    benchmark_iterations: 'Iterations',
    run_benchmark: 'Run benchmark',
    run_real_benchmark: 'Run real benchmark',
    download_qr: 'Download QR',
    upload_qr_image: 'Read QR from image',
    camera_scan: 'Camera scan',
    open_camera: 'Open camera',
    close_camera: 'Close camera',
    reader_result: 'Reader result',
    preview_title: 'Preview',
    char_count_label: 'Characters',
    current_format: 'Current format',
    correction_level: 'Correction level',
    camera_preview: 'Camera Preview',
    benchmark_title: 'Benchmark',
    real_benchmark_title: 'Real Camera Benchmark',
    attempts: 'Attempts',
    successes: 'Successes',
    avg_time: 'Average time',
    text_counter_title: 'Text Counter',
    text_input: 'Text input',
    normalize_space: 'Normalize spaces',
    copy: 'Copy',
    clear: 'Clear',
    byte_count_label: 'Bytes (UTF-8)',
    line_count_label: 'Lines',
    trimmed_count_label: 'Without spaces',
    word_count_label: 'Words',
    paragraph_count_label: 'Paragraphs',
    reading_time_label: 'Reading time',
    copy_status_label: 'Copy status',
    text_suggestion_title: 'Applied extra useful features',
    text_feature_1: 'Word, paragraph, and reading-time metrics',
    text_feature_2: 'Whitespace normalization for pasted content',
    text_feature_3: 'Copy button before sharing to docs or chats',
    json_title: 'JSON / String handling',
    json_raw_input: 'Raw input',
    json_helper: 'Formats objects/arrays, primitive JSON like "hello", 123, true, and even plain text gracefully.',
    json_type: 'Detected type',
    json_length: 'Input length',
    json_status: 'Status',
    parse_error: 'Parse error',
    smartthings_title: 'Artifact-based TPK extraction',
    extract_tpk: 'Start TPK extraction',
    how_it_works: 'How it works',
    smartthings_helper: 'Builds the repos/product/armv7l/packages/armv7l/ path from the artifact URL, scans RPMs, downloads the RPM containing SmartThings TPK, and extracts the TPK from usr/apps/.preload-rw-tpk.',
    extract_log: 'Extraction log',
    notes: 'Notes',
    smartthings_note_1: 'If the target server is not accessible, errors such as 403 may be shown.',
    smartthings_note_2: 'The RPM payload extractor supports xz/gzip payloads.',
    smartthings_note_3: 'The first SmartThings TPK found is downloaded automatically.',
  },
};

const state = {
  language: 'ko',
  theme: 'aurora',
};

const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
const subtabButtons = document.querySelectorAll('[data-subtab-target]');
const subtabPanels = document.querySelectorAll('[data-subtab-panel]');
const translatableNodes = document.querySelectorAll('[data-i18n]');
const languageSelect = document.getElementById('language-select');
const themeSelect = document.getElementById('theme-select');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tabTarget;
    tabButtons.forEach((item) => item.classList.toggle('active', item === button));
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
  });
});

subtabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.subtabTarget;
    subtabButtons.forEach((item) => item.classList.toggle('active', item === button));
    subtabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.subtabPanel === target));
  });
});

function applyTranslations() {
  const dict = translations[state.language] || translations.ko;
  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });
  refreshQrMeta();
  updateTextStats();
  updateJsonViewer();
}

languageSelect.addEventListener('change', () => {
  state.language = languageSelect.value;
  applyTranslations();
});

themeSelect.addEventListener('change', () => {
  state.theme = themeSelect.value;
  document.body.dataset.theme = state.theme;
});

const qrInput = document.getElementById('qr-input');
const qrSize = document.getElementById('qr-size');
const qrMargin = document.getElementById('qr-margin');
const qrErrorLevel = document.getElementById('qr-error-level');
const qrDarkColor = document.getElementById('qr-dark-color');
const qrLightColor = document.getElementById('qr-light-color');
const qrFormat = document.getElementById('qr-format');
const qrShowBg = document.getElementById('qr-show-bg');
const benchmarkCount = document.getElementById('benchmark-count');
const qrSizeLabel = document.getElementById('qr-size-label');
const qrMarginLabel = document.getElementById('qr-margin-label');
const qrImage = document.getElementById('qr-image');
const downloadLink = document.getElementById('download-link');
const benchmarkButton = document.getElementById('benchmark-button');
const realBenchmarkButton = document.getElementById('real-benchmark-button');
const benchmarkList = document.getElementById('benchmark-list');
const uploadInput = document.getElementById('qr-upload');
const qrReadResult = document.getElementById('qr-read-result');
const qrCanvas = document.getElementById('qr-canvas');
const qrVideo = document.getElementById('qr-video');
const cameraStart = document.getElementById('camera-start');
const cameraStop = document.getElementById('camera-stop');
const cameraStatus = document.getElementById('camera-status');
const qrCharCount = document.getElementById('qr-char-count');
const qrFormatLabel = document.getElementById('qr-format-label');
const qrLevelLabel = document.getElementById('qr-level-label');
const realAttempts = document.getElementById('real-attempts');
const realSuccesses = document.getElementById('real-successes');
const realAverage = document.getElementById('real-average');
const realBenchmarkLog = document.getElementById('real-benchmark-log');

let cameraStream;
let scanFrame;

function ensureQrLibrary() {
  return typeof window.QRCode !== 'undefined';
}

function ensureJsQrLibrary() {
  return typeof window.jsQR !== 'undefined';
}

function getRepeatCount() {
  const value = Number(benchmarkCount.value);
  if (!Number.isFinite(value) || value < 1) return 100;
  return Math.min(1000, Math.floor(value));
}

function getQrOptions(width = Number(qrSize.value), includeFormat = true) {
  const options = {
    width,
    margin: Number(qrMargin.value),
    errorCorrectionLevel: qrErrorLevel.value,
    color: {
      dark: qrDarkColor.value,
      light: qrShowBg.checked ? qrLightColor.value : '#0000',
    },
  };

  if (includeFormat) options.type = qrFormat.value;
  return options;
}

function refreshQrMeta() {
  const isKo = state.language === 'ko';
  qrSizeLabel.textContent = isKo ? `사이즈: ${qrSize.value}px` : `Size: ${qrSize.value}px`;
  qrMarginLabel.textContent = isKo ? `여백: ${qrMargin.value}` : `Margin: ${qrMargin.value}`;
  qrCharCount.textContent = qrInput.value.length;
  qrFormatLabel.textContent = qrFormat.value.replace('image/', '').toUpperCase();
  qrLevelLabel.textContent = qrErrorLevel.value;
}

function renderQr() {
  refreshQrMeta();

  if (!ensureQrLibrary()) {
    qrReadResult.textContent = state.language === 'ko' ? 'QR 라이브러리를 아직 불러오지 못했습니다.' : 'QR library is not loaded yet.';
    return;
  }

  window.QRCode.toDataURL(qrInput.value || ' ', getQrOptions(), (error, url) => {
    if (error) {
      qrReadResult.textContent = `${state.language === 'ko' ? 'QR 생성 오류' : 'QR generation failed'}: ${error.message}`;
      return;
    }

    qrImage.src = url;
    qrImage.width = Number(qrSize.value);
    qrImage.height = Number(qrSize.value);
    downloadLink.href = url;
    downloadLink.download = `tool-box-qr.${qrFormat.value.split('/')[1] || 'png'}`;
  });
}

[qrInput, qrSize, qrMargin, qrErrorLevel, qrDarkColor, qrLightColor, qrFormat, qrShowBg, benchmarkCount].forEach((element) => {
  element.addEventListener('input', renderQr);
  element.addEventListener('change', renderQr);
});

window.addEventListener('load', () => {
  applyTranslations();
  window.setTimeout(renderQr, 150);
});

benchmarkButton.addEventListener('click', async () => {
  if (!ensureQrLibrary()) {
    benchmarkList.innerHTML = `<li>${state.language === 'ko' ? 'QR 라이브러리를 불러오지 못해 벤치마킹을 실행할 수 없습니다.' : 'QR library unavailable.'}</li>`;
    return;
  }

  const iterations = getRepeatCount();
  const cases = [
    { label: state.language === 'ko' ? '짧은 텍스트' : 'Short text', value: 'Tool Box' },
    { label: state.language === 'ko' ? '현재 입력값' : 'Current input', value: qrInput.value || 'https://example.com/tool-box' },
    { label: state.language === 'ko' ? '긴 문장' : 'Long payload', value: `${qrInput.value}\n${qrInput.value}\n${qrInput.value}`.trim() },
  ];

  benchmarkList.classList.remove('empty-state');
  benchmarkList.innerHTML = `<li>${state.language === 'ko' ? `총 ${iterations}회 반복 측정 중...` : `Running ${iterations} iterations...`}</li>`;

  const results = [];
  for (const item of cases) {
    const durations = [];
    for (let index = 0; index < iterations; index += 1) {
      const started = performance.now();
      await window.QRCode.toDataURL(item.value || ' ', getQrOptions(256, false));
      durations.push(performance.now() - started);
    }

    const total = durations.reduce((sum, value) => sum + value, 0);
    const average = total / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    results.push({
      label: item.label,
      chars: item.value.length,
      average: average.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      iterations,
    });
  }

  benchmarkList.innerHTML = results
    .map(
      (item) => `
        <li>
          <span>${item.label}</span>
          <span>${item.chars} chars</span>
          <span>avg ${item.average} ms</span>
          <span>min ${item.min} / max ${item.max}</span>
          <span>${item.iterations}x</span>
        </li>`,
    )
    .join('');
});

function decodeImageToResult(image) {
  if (!ensureJsQrLibrary()) {
    qrReadResult.textContent = state.language === 'ko' ? 'QR 리더 라이브러리를 아직 불러오지 못했습니다.' : 'QR reader library is not loaded yet.';
    return null;
  }

  const context = qrCanvas.getContext('2d', { willReadFrequently: true });
  qrCanvas.width = image.videoWidth || image.width;
  qrCanvas.height = image.videoHeight || image.height;
  context.drawImage(image, 0, 0, qrCanvas.width, qrCanvas.height);
  const imageData = context.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
  const started = performance.now();
  const decoded = window.jsQR(imageData.data, imageData.width, imageData.height);
  const elapsed = performance.now() - started;
  return { decoded, elapsed };
}

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);
  image.onload = () => {
    const result = decodeImageToResult(image);
    qrReadResult.textContent = result?.decoded ? result.decoded.data : state.language === 'ko' ? 'QR 코드를 찾지 못했습니다.' : 'QR code not found.';
    URL.revokeObjectURL(objectUrl);
  };
  image.onerror = () => {
    qrReadResult.textContent = state.language === 'ko' ? '이미지를 불러오지 못했습니다.' : 'Unable to load image.';
    URL.revokeObjectURL(objectUrl);
  };
  image.src = objectUrl;
});

async function startCameraScan() {
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraStatus.textContent = state.language === 'ko' ? '이 브라우저에서는 카메라 접근을 지원하지 않습니다.' : 'Camera access is not supported in this browser.';
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    qrVideo.srcObject = cameraStream;
    cameraStatus.textContent = state.language === 'ko' ? '카메라 연결 완료. QR을 프레임 안에 맞춰 주세요.' : 'Camera connected. Align the QR in the frame.';

    const scan = () => {
      if (!cameraStream) return;
      if (qrVideo.readyState >= 2) {
        const result = decodeImageToResult(qrVideo);
        if (result?.decoded?.data) {
          qrReadResult.textContent = result.decoded.data;
          cameraStatus.textContent = state.language === 'ko' ? 'QR을 감지했습니다. 계속 스캔 중입니다.' : 'QR detected. Continuing scan.';
        }
      }
      scanFrame = requestAnimationFrame(scan);
    };

    cancelAnimationFrame(scanFrame);
    scan();
  } catch (error) {
    cameraStatus.textContent = `${state.language === 'ko' ? '카메라를 열 수 없습니다' : 'Unable to open camera'}: ${error.message}`;
  }
}

function stopCameraScan() {
  cancelAnimationFrame(scanFrame);
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = undefined;
  }
  qrVideo.srcObject = null;
  cameraStatus.textContent = state.language === 'ko' ? '카메라가 중지되었습니다.' : 'Camera stopped.';
}

cameraStart.addEventListener('click', startCameraScan);
cameraStop.addEventListener('click', stopCameraScan);
window.addEventListener('beforeunload', stopCameraScan);

realBenchmarkButton.addEventListener('click', async () => {
  const iterations = getRepeatCount();
  if (!cameraStream || qrVideo.readyState < 2) {
    realBenchmarkLog.textContent = state.language === 'ko' ? '먼저 카메라를 열어 주세요. 리얼 벤치마킹은 실제 카메라 프레임을 반복 검사합니다.' : 'Open the camera first. Real benchmarking analyzes actual camera frames repeatedly.';
    return;
  }

  realBenchmarkLog.textContent = state.language === 'ko' ? `실제 카메라 프레임 ${iterations}회 측정 중...` : `Measuring ${iterations} live camera frames...`;
  let success = 0;
  const durations = [];

  for (let index = 0; index < iterations; index += 1) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const result = decodeImageToResult(qrVideo);
    if (!result) continue;
    durations.push(result.elapsed);
    if (result.decoded?.data) success += 1;
  }

  const total = durations.reduce((sum, value) => sum + value, 0);
  const average = durations.length ? (total / durations.length).toFixed(2) : '0.00';
  realAttempts.textContent = String(iterations);
  realSuccesses.textContent = String(success);
  realAverage.textContent = `${average} ms`;
  realBenchmarkLog.textContent = state.language === 'ko'
    ? `실프레임 ${iterations}회 반복 측정 완료\n성공 인식: ${success}회\n평균 디코드 시간: ${average} ms\n실패 프레임도 포함해 카메라 환경 품질을 볼 수 있습니다.`
    : `Finished ${iterations} live-frame checks\nSuccessful detections: ${success}\nAverage decode time: ${average} ms\nFailed frames are included to reflect real camera conditions.`;
});

const textInput = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
const byteCount = document.getElementById('byte-count');
const lineCount = document.getElementById('line-count');
const trimmedCount = document.getElementById('trimmed-count');
const wordCount = document.getElementById('word-count');
const paragraphCount = document.getElementById('paragraph-count');
const readingTime = document.getElementById('reading-time');
const copyStatus = document.getElementById('copy-status');
const normalizeSpacing = document.getElementById('normalize-spacing');
const copyTextButton = document.getElementById('copy-text');
const clearTextButton = document.getElementById('clear-text');
const encoder = new TextEncoder();

function updateTextStats() {
  const value = textInput.value;
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const paragraphs = value.trim() ? value.trim().split(/\n\s*\n/).length : 0;
  const readingSeconds = Math.max(0, Math.ceil(words / 4.5));

  charCount.textContent = value.length;
  byteCount.textContent = encoder.encode(value).length;
  lineCount.textContent = value.length === 0 ? 0 : value.split(/\n/).length;
  trimmedCount.textContent = value.replace(/\s/g, '').length;
  wordCount.textContent = words;
  paragraphCount.textContent = paragraphs;
  readingTime.textContent = state.language === 'ko' ? `${readingSeconds}초` : `${readingSeconds}s`;
}

normalizeSpacing.addEventListener('click', () => {
  textInput.value = textInput.value.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  updateTextStats();
  copyStatus.textContent = state.language === 'ko' ? '공백 정리 완료' : 'Normalized';
});

copyTextButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textInput.value);
    copyStatus.textContent = state.language === 'ko' ? '복사 완료' : 'Copied';
  } catch (error) {
    copyStatus.textContent = state.language === 'ko' ? '복사 실패' : 'Copy failed';
  }
});

clearTextButton.addEventListener('click', () => {
  textInput.value = '';
  updateTextStats();
  copyStatus.textContent = state.language === 'ko' ? '초기화 완료' : 'Cleared';
});

textInput.addEventListener('input', updateTextStats);

const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const jsonError = document.getElementById('json-error');
const jsonErrorText = jsonError.querySelector('p');
const jsonType = document.getElementById('json-type');
const jsonLength = document.getElementById('json-length');
const jsonStatus = document.getElementById('json-status');

function detectValueType(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function updateJsonViewer() {
  const raw = jsonInput.value;
  jsonLength.textContent = raw.length;

  try {
    const parsed = JSON.parse(raw);
    jsonOutput.textContent = JSON.stringify(parsed, null, 2);
    jsonType.textContent = detectValueType(parsed);
    jsonStatus.textContent = state.language === 'ko' ? '정상' : 'Valid';
    jsonOutput.classList.remove('hidden');
    jsonError.classList.add('hidden');
    return;
  } catch (firstError) {
    jsonOutput.textContent = JSON.stringify(raw, null, 2);
    jsonType.textContent = 'string';
    jsonStatus.textContent = state.language === 'ko' ? '문자열로 처리' : 'Handled as string';
    jsonOutput.classList.remove('hidden');
    jsonError.classList.add('hidden');
    jsonErrorText.textContent = firstError.message;
  }
}

jsonInput.addEventListener('input', updateJsonViewer);

const cosmosUrl = document.getElementById('cosmos-url');
const extractTpkButton = document.getElementById('extract-tpk-button');
const smartthingsStatus = document.getElementById('smartthings-status');

extractTpkButton.addEventListener('click', async () => {
  const artifactUrl = cosmosUrl.value.trim();
  if (!artifactUrl) {
    smartthingsStatus.textContent = state.language === 'ko' ? 'Cosmos URL을 입력해 주세요.' : 'Please provide a Cosmos URL.';
    return;
  }

  smartthingsStatus.textContent = state.language === 'ko' ? '추출 요청 전송 중...' : 'Sending extraction request...';
  extractTpkButton.disabled = true;

  try {
    const response = await fetch('/api/smartthings/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artifactUrl }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      smartthingsStatus.textContent = `${state.language === 'ko' ? '추출 실패' : 'Extraction failed'}: ${errorText}`;
      return;
    }

    const disposition = response.headers.get('Content-Disposition') || '';
    const match = disposition.match(/filename="?([^\"]+)"?/i);
    const filename = match?.[1] || 'smartthings.tpk';
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(blobUrl);
    smartthingsStatus.textContent = `${state.language === 'ko' ? '추출 성공' : 'Extraction succeeded'}: ${filename}`;
  } catch (error) {
    smartthingsStatus.textContent = `${state.language === 'ko' ? '추출 실패' : 'Extraction failed'}: ${error.message}`;
  } finally {
    extractTpkButton.disabled = false;
  }
});

updateTextStats();
updateJsonViewer();
