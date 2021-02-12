import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AdminProvider from './Contexts/Admin';
import UserProvider from './Contexts/User';
import Pages from './pages';

function App() {
  return (
    <Router>
      <AdminProvider>
        <UserProvider>
          <Pages />
        </UserProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
