const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tabTarget;
    tabButtons.forEach((item) => item.classList.toggle('active', item === button));
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
  });
});

const qrInput = document.getElementById('qr-input');
const qrSize = document.getElementById('qr-size');
const qrSizeLabel = document.getElementById('qr-size-label');
const qrImage = document.getElementById('qr-image');
const downloadLink = document.getElementById('download-link');
const benchmarkButton = document.getElementById('benchmark-button');
const benchmarkList = document.getElementById('benchmark-list');
const uploadInput = document.getElementById('qr-upload');
const qrReadResult = document.getElementById('qr-read-result');
const qrCanvas = document.getElementById('qr-canvas');

function ensureQrLibrary() {
  return typeof window.QRCode !== 'undefined';
}

function renderQr() {
  qrSizeLabel.textContent = `사이즈: ${qrSize.value}px`;

  if (!ensureQrLibrary()) {
    qrReadResult.textContent = 'QR 라이브러리를 아직 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
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
        qrReadResult.textContent = `QR 생성 오류: ${error.message}`;
        return;
      }
      qrImage.src = url;
      qrImage.width = Number(qrSize.value);
      qrImage.height = Number(qrSize.value);
      downloadLink.href = url;
    },
  );
}

qrInput.addEventListener('input', renderQr);
qrSize.addEventListener('input', renderQr);
window.addEventListener('load', () => window.setTimeout(renderQr, 150));

benchmarkButton.addEventListener('click', async () => {
  if (!ensureQrLibrary()) {
    benchmarkList.innerHTML = '<li>QR 라이브러리를 불러오지 못해 벤치마킹을 실행할 수 없습니다.</li>';
    return;
  }

  const cases = [
    { label: '짧은 텍스트', value: 'Tool Box' },
    { label: 'URL', value: qrInput.value || 'https://example.com/tool-box' },
    { label: '긴 문장', value: `${qrInput.value}\n${qrInput.value}\n${qrInput.value}`.trim() },
  ];

  const results = [];
  for (const item of cases) {
    const started = performance.now();
    await window.QRCode.toDataURL(item.value || ' ', { width: 256, margin: 1 });
    results.push({
      label: item.label,
      chars: item.value.length,
      duration: (performance.now() - started).toFixed(2),
    });
  }

  benchmarkList.classList.remove('empty-state');
  benchmarkList.innerHTML = results
    .map(
      (item) => `<li><span>${item.label}</span><span>${item.chars} chars</span><span>${item.duration} ms</span></li>`,
    )
    .join('');
});

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (typeof window.jsQR === 'undefined') {
    qrReadResult.textContent = 'QR 리더 라이브러리를 아직 불러오지 못했습니다.';
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
    qrReadResult.textContent = decoded ? decoded.data : 'QR 코드를 찾지 못했습니다. 다른 이미지를 시도해 주세요.';
    URL.revokeObjectURL(objectUrl);
  };

  image.onerror = () => {
    qrReadResult.textContent = '이미지를 불러오지 못했습니다. 파일 형식을 확인해 주세요.';
    URL.revokeObjectURL(objectUrl);
  };

  image.src = objectUrl;
});

const textInput = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
const byteCount = document.getElementById('byte-count');
const lineCount = document.getElementById('line-count');
const trimmedCount = document.getElementById('trimmed-count');
const encoder = new TextEncoder();

function updateTextStats() {
  const value = textInput.value;
  charCount.textContent = value.length;
  byteCount.textContent = encoder.encode(value).length;
  lineCount.textContent = value.length === 0 ? 0 : value.split(/\n/).length;
  trimmedCount.textContent = value.replace(/\s/g, '').length;
}

textInput.addEventListener('input', updateTextStats);
updateTextStats();

const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const jsonError = document.getElementById('json-error');
const jsonErrorText = jsonError.querySelector('p');

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

jsonInput.addEventListener('input', updateJsonViewer);
updateJsonViewer();
