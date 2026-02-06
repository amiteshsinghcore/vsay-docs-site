import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

const COLORS = [
  { name: 'blue', label: 'Blue', color: '#2563eb' },
  { name: 'orange', label: 'Orange', color: '#f97316' },
  { name: 'cyan', label: 'Cyan', color: '#06b6d4' },
  { name: 'violet', label: 'Violet', color: '#8b5cf6' },
];

const STORAGE_KEY = 'docusaurus.color';

function ColorPickerInner(): React.ReactElement {
  const [color, setColor] = useState('blue');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconUrl = useBaseUrl('/img/color-picker.png');

  useEffect(() => {
    const savedColor = localStorage.getItem(STORAGE_KEY);
    if (savedColor && COLORS.some(c => c.name === savedColor)) {
      setColor(savedColor);
      document.documentElement.setAttribute('data-color', savedColor);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem(STORAGE_KEY, newColor);
    document.documentElement.setAttribute('data-color', newColor);
    setIsOpen(false);
  };

  return (
    <div className="color-picker-dropdown" ref={dropdownRef}>
      <button
        className="color-picker-dropdown__toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Change theme color"
        aria-label="Change theme color"
      >
        <img src={iconUrl} alt="Color picker" />
      </button>
      {isOpen && (
        <div className="color-picker-dropdown__menu">
          {COLORS.map((c) => (
            <button
              key={c.name}
              className={`color-picker-dropdown__item ${
                color === c.name ? 'color-picker-dropdown__item--active' : ''
              }`}
              onClick={() => handleColorChange(c.name)}
            >
              <span
                className="color-picker-dropdown__color"
                style={{ backgroundColor: c.color }}
              />
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ColorPicker(): React.ReactElement {
  return (
    <BrowserOnly fallback={<div className="color-picker-dropdown" />}>
      {() => <ColorPickerInner />}
    </BrowserOnly>
  );
}
