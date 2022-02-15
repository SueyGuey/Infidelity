import React from 'react';
import TopNavBar from './components/TopNavBar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <TopNavBar/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
