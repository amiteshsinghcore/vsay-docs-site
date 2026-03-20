import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';

type ThemeMode = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'webxterm-theme';
const MODES: ThemeMode[] = ['dark', 'light', 'system'];

function getStoredMode(): ThemeMode {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'dark';
  } catch {
    return 'dark';
  }
}

function getSystemPreference(): 'dark' | 'light' {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

// Moon icon — dark mode
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Sun icon — light mode
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

// Monitor icon — system default
const SystemIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const CONFIG = {
  dark:   { Icon: MoonIcon,   label: 'Dark'   },
  light:  { Icon: SunIcon,    label: 'Light'  },
  system: { Icon: SystemIcon, label: 'System' },
} as const;

function ThemeToggle() {
  const { setColorMode } = useColorMode();
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const mqRef = useRef<(() => void) | null>(null);

  const applyMode = useCallback((m: ThemeMode) => {
    const resolved = m === 'system' ? getSystemPreference() : m;
    setColorMode(resolved);
  }, [setColorMode]);

  useEffect(() => {
    // Remove previous system listener if any
    if (mqRef.current) {
      mqRef.current();
      mqRef.current = null;
    }

    applyMode(mode);

    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setColorMode(e.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', handler);
      mqRef.current = () => mq.removeEventListener('change', handler);
    }
  }, [mode, applyMode, setColorMode]);

  const handleClick = () => {
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    setMode(next);
  };

  const { Icon, label } = CONFIG[mode];

  return (
    <button
      className="webxterm-theme-toggle"
      onClick={handleClick}
      title={`Theme: ${label} — click to switch`}
      aria-label={`Theme: ${label}. Click to switch.`}
      type="button"
    >
      <Icon />
      <span className="webxterm-theme-toggle__label">{label}</span>
    </button>
  );
}

export default function ColorModeToggleWrapper(): React.ReactElement {
  return (
    <BrowserOnly fallback={<div className="webxterm-theme-toggle-placeholder" />}>
      {() => <ThemeToggle />}
    </BrowserOnly>
  );
}
