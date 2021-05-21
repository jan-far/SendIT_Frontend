import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import UserProvider from './Contexts/User';
import Pages from './pages';
import { GlobalStyles } from './globalScope';
import './App.css';
import { useDarkMode } from './Components/ThemeMode';
import ThemeToggle from './Components/ThemeToggler';

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <UserProvider>
          <Router>
            <Pages />
          </Router>
        </UserProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
