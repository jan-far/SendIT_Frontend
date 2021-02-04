import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UserProvider from './Contexts/User';
// import LocationSearchInput from './Components/GooglePlace/indexs.js';
// import LoadingSpinner from './Components/LoadingPage';
import Pages from './pages';

function App() {
  return (
    <Router>
      <UserProvider>
        <Pages />
      </UserProvider>
    </Router>
  );
}

export default App;
