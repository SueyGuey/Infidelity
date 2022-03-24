import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import userPool from './authentication/userPool';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunkMiddleWare from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
/* pages */
import Dashboard from './components/dashboard';
import Home from './components/home';
import './App.css';

function App() {
  const loggedIn = userPool.getCurrentUser() !== null;
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunkMiddleWare));
  return (
			<Provider store={store}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
          </Router>
        </div>
			</Provider>
  );
}

export default App;
