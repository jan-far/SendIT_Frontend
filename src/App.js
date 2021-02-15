import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UserProvider from './Contexts/User';
import Pages from './pages';

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Pages />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
