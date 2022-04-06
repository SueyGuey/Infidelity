import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate, useParams } from 'react-router-dom';
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
import TransactionCompletePop from './components/TransactionCompletePop';
import AddWatchlistPop from './components/AddWatchlistPop';
import AddPortfolioPop from './components/AddPortfolioPop';

function App() {
  const loggedIn = userPool.getCurrentUser() !== null;
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunkMiddleWare));
  let { item } = useParams();
  let {buy} = useParams();
  return (
			<Provider store={store}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              {/* FOR TESTING */}
              <Route path="/popUp/0" element={<TransactionCompletePop buy = {item || 0}/>}/>
              <Route path="/popUp/1" element={<TransactionCompletePop buy = {item || 1}/>}/>
              <Route path="/popUp/2" element={<AddPortfolioPop/>}/>
              <Route path="/popUp/3" element={<AddWatchlistPop/>}/>
              {/* for testing end. */}
              <Route path='/dashboard' element={<Dashboard item = {item || "dashboard"}/>}/>
              <Route path='/stockDash/:symbol' element={<StockDash/>}/>

              <Route path='/dashboard/tradeHistory' element={<Dashboard item = {item||"tradeHistory"}/>}/>
              <Route path='/dashboard/summary' element={<Dashboard item = {item ||"summary"}/>}/>
              <Route path='/dashboard/profile' element={<Dashboard item ={item ||"profile"}/>}/>
              <Route path='/dashboard/settings' element={<Dashboard item = {item||"settings"}/>}/>
              <Route path='/dashboard/searchLarge' element={<Dashboard item = {item||"searchLarge"}/>}/>
            </Routes>
          </Router>
        </div>
			</Provider>
  );
}

export default App;
