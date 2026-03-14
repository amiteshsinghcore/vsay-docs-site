import React, { useEffect } from 'react';
import ColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import type ColorModeToggleType from '@theme/Navbar/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';
import { useColorMode } from '@docusaurus/theme-common';

type Props = WrapperProps<typeof ColorModeToggleType>;

function SelectionHighlight(): null {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const id = 'webxterm-selection-style';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent =
      colorMode === 'dark'
        ? '::selection { background-color: rgba(0, 230, 118, 0.3) !important; }'
        : '::selection { background-color: rgba(249, 115, 22, 0.4) !important; }';
  }, [colorMode]);

  return null;
}

export default function ColorModeToggleWrapper(props: Props): React.ReactElement {
  return (
    <>
      <SelectionHighlight />
      <ColorModeToggle {...props} />
    </>
  );
}
