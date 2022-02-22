import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import UserPool from './authentication/userPool';
/* pages */
import Dashboard from './components/dashboard';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/">
						  {UserPool.getCurrentUser() == null ? (
								<Navigate to="/home" />
							) : (
								<Navigate to="/dashboard" />
							)}
					</Route> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
