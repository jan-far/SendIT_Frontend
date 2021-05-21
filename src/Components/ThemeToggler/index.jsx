import React from 'react';
import { ToggleButton } from './themeToggleElement';
const sun = './images/sun.png';
const moon = './images/moon.png';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <>
      <ToggleButton lightTheme={isLight} onClick={toggleTheme}>
        <img src={sun} alt="sun" width="15" height="15"/>
        <img src={moon} alt="moon" width="15" height="15"/>
      </ToggleButton>
    </>
  );
};

export default ThemeToggle;
