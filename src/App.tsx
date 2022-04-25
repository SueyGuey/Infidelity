/**
 * App.tsx
 * This contains everything for our app, including running all of our pages
 * This is also responsible for routing
 */

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
import AboutPage from './components/InfoPages/AboutPage';
import FeaturePage from './components/InfoPages/FeaturesPage';
import TradeHistory from './components/tradeHistory';
function App() {
	//We have to logged in
	const loggedIn = userPool.getCurrentUser() !== null;
	const store = createStore(reducers, {}, applyMiddleware(ReduxThunkMiddleWare));
	const { item } = useParams();

	// App contains routes to display all appropriate pages. Restricting content in App.tsx
	// reduces clutter.
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						{/* FOR TESTING */}
						{/* <Route path="/popUp/4" element={<AddPortfolioPop />} /> */}
						{/* <Route path="/popUp/5" element={<AddWatchlistPop />} /> */}
						{/* <Route path="/popUp/6" element={<AddToWatchList />} /> */}
						{/* for testing end. */}
						<Route path="/About" element={<AboutPage />} />
						<Route path="/Features" element={<FeaturePage />} />
						<Route
							path="/dashboard"
							element={<Dashboard item={item || 'dashboard'} />}
						/>
						<Route path="/stockDash/:symbol" element={<StockDash />} />
						<Route
							path="/dashboard/tradeHistory"
							element={<TradeHistory item={item || 'tradeHistory'} />}
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
