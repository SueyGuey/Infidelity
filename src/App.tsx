import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import userPool from './authentication/userPool';
/* pages */
import Dashboard from './components/dashboard';
import Home from './components/home';
import './App.css';

function App() {
  const loggedIn = userPool.getCurrentUser() !== null;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
