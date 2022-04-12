/**
 * StockDash.tsx
 * Dashboard page containing all components related
 */

import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import '../css/Dashboard.css';
import StockDashBottom from './StockDashBottom';
import StockDashTop from './StockDashTop';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { DEFAULT_PRICE_TIMEOUT, priceBackend } from '../endpoints';

const PRICE_UPDATE_WINDOW = 1000 * 10; // 10 seconds

/**
 * This is the StockDash component. It is visually similar to the style of the user dashboard.
 * The Side menu remains persistant in all stock pages to allow for seemless traversal back to
 * the user dashboard or any relevant implemented pages. It also contains a search container to
 * continue navigating through stocks easily on user whim.
 *
 * Contains the graphical information of stock price, stock information and the buy and sell
 * section. (See BuySell.tsx, BuySellPopup.tsx)
 */

function StockDash(props: WithMarketLoaderProps): ReactElement {
	const { symbol } = useParams();
	const itemSymbol = symbol || 'MSFT';

	const [stock, setStock] = useState(
		props.marketData.find((stock) => stock.symbol === itemSymbol)
	);

	useEffect(() => {
		if (!stock) {
			const find = props.marketData.find((stock) => stock.symbol === itemSymbol);
			if (!find) {
				props.searchMarket(itemSymbol);
			} else {
				setStock(find);
			}
		}
	}, [itemSymbol, stock, props.marketData.length]);

	if (!stock) {
		return <div>Loading...</div>;
	}
	const [price, setPrice] = useState(stock.currentPrice);
	const updatedStock = { ...stock, currentPrice: price };

	function updatePrice() {
		const nowMillis = new Date().getTime();
		if (!price || nowMillis - price.lastUpdated > PRICE_UPDATE_WINDOW) {
			priceBackend(itemSymbol, PRICE_UPDATE_WINDOW, DEFAULT_PRICE_TIMEOUT).then(
				(newPrice) => {
					setPrice(newPrice);
				}
			);
		}
	}

	// update price every 10 seconds
	useEffect(() => {
		const interval = setInterval(updatePrice, PRICE_UPDATE_WINDOW);
		return () => clearInterval(interval);
	}, []);

	//Displays user's portfolio or apple if they are logged in
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="Dashboard">
			<DashSideMenu active={'searchLarge'} />
			<StockDashTop item={updatedStock} />
			<StockDashBottom item={updatedStock} />
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withMarketLoader(StockDash);
