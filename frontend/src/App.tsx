import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Home from './pages/home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
