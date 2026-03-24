const { useEffect, useMemo, useState } = React;

const i18n = {
  ko: {
    title: 'React 기반 Tool Box',
    subtitle: '요청하신 대로 React로 다시 만든 간단한 버전입니다.',
    tabQr: 'QR 생성기',
    tabText: '텍스트 카운터',
    tabJson: 'JSON 뷰어',
    language: '언어',
    theme: '테마',
    dark: '다크',
    light: '라이트',
    qrInput: 'QR 내용',
    qrSize: '사이즈',
    generate: '생성',
    textInput: '텍스트 입력',
    chars: '글자 수',
    words: '단어 수',
    lines: '줄 수',
    jsonInput: 'JSON 입력',
    jsonPretty: '포맷 결과',
    parseError: '파싱 오류'
  },
  en: {
    title: 'React Tool Box',
    subtitle: 'A compact React remake based on your request.',
    tabQr: 'QR Generator',
    tabText: 'Text Counter',
    tabJson: 'JSON Viewer',
    language: 'Language',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    qrInput: 'QR content',
    qrSize: 'Size',
    generate: 'Generate',
    textInput: 'Text input',
    chars: 'Characters',
    words: 'Words',
    lines: 'Lines',
    jsonInput: 'JSON input',
    jsonPretty: 'Formatted output',
    parseError: 'Parse error'
  }
};

function QrTool({ t }) {
  const [content, setContent] = useState('https://example.com');
  const [size, setSize] = useState(240);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const generateQr = async () => {
    if (!window.QRCode) return;
    try {
      const url = await window.QRCode.toDataURL(content || ' ', {
        width: Number(size),
        margin: 2,
        color: { dark: '#11131e', light: '#ffffff' }
      });
      setQrDataUrl(url);
    } catch (e) {
      setQrDataUrl('');
    }
  };

  useEffect(() => {
    generateQr();
  }, []);

  return (
    <section className="card stack-gap">
      <label className="field">
        <span>{t.qrInput}</span>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label className="field inline-field">
        <span>{t.qrSize}: {size}px</span>
        <input type="range" min="128" max="512" step="16" value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <div className="button-row">
        <button type="button" onClick={generateQr}>{t.generate}</button>
      </div>
      <div className="qr-preview preview-stack">
        {qrDataUrl ? <img src={qrDataUrl} alt="QR" /> : <p>QR unavailable</p>}
      </div>
    </section>
  );
}

function TextTool({ t }) {
  const [value, setValue] = useState('React로 만든 텍스트 카운터');

  const stats = useMemo(() => {
    const chars = value.length;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    const lines = value ? value.split('\n').length : 0;
    return { chars, words, lines };
  }, [value]);

  return (
    <section className="card stack-gap">
      <label className="field">
        <span>{t.textInput}</span>
        <textarea rows="10" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <div className="stats-grid">
        <div className="stat-card"><span>{t.chars}</span><strong>{stats.chars}</strong></div>
        <div className="stat-card"><span>{t.words}</span><strong>{stats.words}</strong></div>
        <div className="stat-card"><span>{t.lines}</span><strong>{stats.lines}</strong></div>
      </div>
    </section>
  );
}

function JsonTool({ t }) {
  const [raw, setRaw] = useState('{"name":"tool-box","stack":"react"}');

  const result = useMemo(() => {
    try {
      return { pretty: JSON.stringify(JSON.parse(raw), null, 2), error: '' };
    } catch (e) {
      return { pretty: '', error: e.message };
    }
  }, [raw]);

  return (
    <section className="grid-two">
      <div className="card stack-gap">
        <label className="field">
          <span>{t.jsonInput}</span>
          <textarea rows="14" value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck="false" />
        </label>
      </div>
      <div className="card stack-gap">
        <h3>{t.jsonPretty}</h3>
        {result.error ? (
          <div className="result-box error-box">
            <strong>{t.parseError}</strong>
            <p>{result.error}</p>
          </div>
        ) : (
          <pre className="json-output">{result.pretty}</pre>
        )}
      </div>
    </section>
  );
}

function App() {
  const [language, setLanguage] = useState('ko');
  const [theme, setTheme] = useState('dark');
  const [tab, setTab] = useState('qr');

  const t = i18n[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
  }, [language, theme]);

  return (
    <div className="dashboard-shell" style={{ gridTemplateColumns: '1fr' }}>
      <div className="glass">
        <section className="card hero">
          <p className="eyebrow">TOOL BOX</p>
          <h1>{t.title}</h1>
          <p className="hero-copy">{t.subtitle}</p>
          <div className="settings-grid" style={{ marginTop: '12px' }}>
            <label className="field">
              <span>{t.language}</span>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="field">
              <span>{t.theme}</span>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="dark">{t.dark}</option>
                <option value="light">{t.light}</option>
              </select>
            </label>
          </div>
        </section>

        <section className="card stack-gap">
          <div className="button-row">
            <button type="button" className={tab === 'qr' ? 'tab active' : 'tab'} onClick={() => setTab('qr')}>{t.tabQr}</button>
            <button type="button" className={tab === 'text' ? 'tab active' : 'tab'} onClick={() => setTab('text')}>{t.tabText}</button>
            <button type="button" className={tab === 'json' ? 'tab active' : 'tab'} onClick={() => setTab('json')}>{t.tabJson}</button>
          </div>
        </section>

        {tab === 'qr' && <QrTool t={t} />}
        {tab === 'text' && <TextTool t={t} />}
        {tab === 'json' && <JsonTool t={t} />}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
