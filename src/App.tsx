import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import userPool from './authentication/userPool';
// @ts-ignore 
import { createStore, applyMiddleware } from 'redux';
// @ts-ignore 
import ReduxThunkMiddleWare from 'redux-thunk';
// @ts-ignore 
import { Provider } from 'react-redux';
// @ts-ignore 
import reducers from './redux/reducers';
/* pages */
import Dashboard from './components/dashboard';
import Home from './components/home';
import './App.css';
import StockDash from './components/StockDash';

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
              <Route path='/stockDash/:symbol' element={<StockDash/>}/>
            </Routes>
          </Router>
        </div>
			</Provider>
  );
}

export default App;
