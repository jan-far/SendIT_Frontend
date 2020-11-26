import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
// import LoadingSpinner from './Components/LoadingPage';
import Pages from './pages';

function App() {
  return (
    <Router>
      <Pages />
      {/* <LoadingSpinner /> */}
    </Router>
  );
}

export default App;
