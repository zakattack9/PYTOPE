import { useState, useEffect } from 'react';
import ToolBarItem from '../ToolBar/ToolBarItem';
import THEMES, { HSL } from '../../data/themes';
import { setCookie, getCookie } from '../../utils/cookie';
import './ToolBarTheme.scss';

interface Props {
  className?: string,
}

// uses cookies to maintain/persist the current theme
function ToolBarTheme(props: Props) {
  const DEFAULT_THEME = 'b&w';
  const COOKIE_KEY = 'theme';
  const currTheme = getCookie(COOKIE_KEY) || DEFAULT_THEME;
  const [theme, setTheme] = useState(currTheme);
  const themes = Object.keys(THEMES);

  const setThemeVar = (name: string, hsl: HSL) => {
    const rootStyles = document.documentElement.style;
    Object.entries(hsl).forEach(([type, val]) => {
      const cssVar = `--${name}-color_${type}`;
      // convert saturation and lightness to percentages
      if (type.match('s|l')) val = `${val}%`;
      rootStyles.setProperty(cssVar, val);
    });
  }

  useEffect(() => {
    setCookie(COOKIE_KEY, theme);
    Object.entries(THEMES[theme]).forEach(([name, hsl]) => {
      setThemeVar(name, hsl);
    });
  }, [theme]);

  const handleClick = (option: string) => {
    setTheme(option);
  }

  return (
    <ToolBarItem name="Theme" options={themes} onClick={handleClick} />
  );
}

export default ToolBarTheme;
