import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate, useParams } from 'react-router-dom';
import userPool from './authentication/userPool';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunkMiddleWare from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
/* pages */
import Dashboard from './components/dashboard';
import Home from './components/home';
import './App.css';
import StockDash from './components/StockDash';
import BuySellPopup from './components/BuySellPopup';

function App() {
	const loggedIn = userPool.getCurrentUser() !== null;
	const store = createStore(reducers, {}, applyMiddleware(ReduxThunkMiddleWare));
	const { item } = useParams();
	const { buy } = useParams();
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						{/* FOR TESTING */}
						<Route path="/popUp/0" element={<BuySellPopup buy={item || 0} />} />
						<Route path="/popUp/1" element={<BuySellPopup buy={item || 1} />} />
						{/* for testing end. */}
						<Route
							path="/dashboard"
							element={<Dashboard item={item || 'dashboard'} />}
						/>
						<Route path="/stockDash/:symbol" element={<StockDash />} />

						<Route
							path="/dashboard/tradeHistory"
							element={<Dashboard item={item || 'tradeHistory'} />}
						/>
						<Route
							path="/dashboard/summary"
							element={<Dashboard item={item || 'summary'} />}
						/>
						<Route
							path="/dashboard/profile"
							element={<Dashboard item={item || 'profile'} />}
						/>
						<Route
							path="/dashboard/settings"
							element={<Dashboard item={item || 'settings'} />}
						/>
						<Route
							path="/dashboard/searchLarge"
							element={<Dashboard item={item || 'searchLarge'} />}
						/>
					</Routes>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
