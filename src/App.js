import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
// import LocationSearchInput from './Components/GooglePlace/indexs.js';
// import LoadingSpinner from './Components/LoadingPage';
import Pages from './pages';

function App() {
  return (
    <Router>
      {/* <LocationSearchInput /> */}
      <Pages />
      {/* <LoadingSpinner /> */}
    </Router>
  );
}

export default App;
