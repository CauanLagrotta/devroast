'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // default theme
import { CodeInput } from './code-input';
import { Button } from './button';

const LANGUAGES = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'plaintext', label: 'Plain Text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'xml', label: 'XML' },
];

const THEMES = [
  { value: 'default', label: 'Default' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'github', label: 'GitHub' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'solarized-dark', label: 'Solarized Dark' },
  { value: 'solarized-light', label: 'Solarized Light' },
];

export const SyntaxHighlightEditor = ({ className = '' }: { className?: string }) => {
  const [code, setCode] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('auto');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('auto');
  const [theme, setTheme] = useState<string>('default');
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const codeInputRef = useRef<HTMLTextAreaElement>(null);
  const highlightedRef = useRef<HTMLPreElement>(null);

  // Load theme CSS dynamically
  useEffect(() => {
    // Remove existing theme link if any
    const existingLink = document.getElementById('highlightjs-theme');
    if (existingLink) {
      existingLink.remove();
    }

    // Skip if theme is 'default' as we already imported the default CSS
    if (theme === 'default') {
      return;
    }

    const link = document.createElement('link');
    link.id = 'highlightjs-theme';
    link.rel = 'stylesheet';
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.min.css`;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [theme]);

  // Auto-detect language when code changes and language is set to auto
  useEffect(() => {
    if (selectedLanguage === 'auto' && code.trim() !== '') {
      const detected = hljs.highlightAuto(code);
      setDetectedLanguage(detected.language ?? 'plaintext');
    }
  }, [code, selectedLanguage]);

  // Highlight code when code, selectedLanguage, or theme changes
  useEffect(() => {
    if (code.trim() === '') {
      setHighlightedCode('');
      return;
    }

    const langToUse = selectedLanguage === 'auto' ? detectedLanguage : selectedLanguage;
    // Fallback to plaintext if language detection fails or is unknown
    const validLang = hljs.getLanguage(langToUse) ? langToUse : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLang }).value;
    setHighlightedCode(highlighted);
  }, [code, selectedLanguage, detectedLanguage, theme]);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    // Reset detected language when user types, but only if on auto-detect
    if (selectedLanguage === 'auto') {
      setDetectedLanguage('auto');
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    // If user selects a specific language, we keep that until they change back to auto
    if (e.target.value !== 'auto') {
      setDetectedLanguage(e.target.value);
    }
  };

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // Optionally show a toast or feedback
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy code');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        {/* Editor Controls */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Code Input
            </label>
            <div className="flex items-center space-x-2">
              <CodeInput
                ref={codeInputRef}
                value={code}
                onChange={handleCodeChange}
                placeholder="Paste your code here..."
                className="flex-1"
              />
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="border border-border rounded px-2 py-1 text-sm bg-bg-input text-text-primary"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Theme
            </label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="border border-border rounded px-2 py-1 text-sm bg-bg-input text-text-primary"
            >
              {THEMES.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleCopyClick} className="w-full">
            Copy Code
          </Button>
        </div>

        {/* Preview */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Preview
            </label>
            <div className="flex-1 min-h-[200px] bg-bg-input rounded p-4 overflow-auto">
              {highlightedCode ? (
                <pre
                  ref={highlightedRef}
                  className="m-0"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              ) : (
                <p className="text-text-tertiary italic">No code to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};