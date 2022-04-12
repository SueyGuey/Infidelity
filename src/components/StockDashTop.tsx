import React, { ReactElement, useEffect, useState } from 'react';
import '../css/DashTop.css';
import '../css/home.css';
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import AddToWatchList from './AddToWatchList';
import { DEFAULT_PRICE_TIMEOUT, priceBackend } from '../endpoints';
import { ChangingNumber } from '../datamodels/misc';

const PRICE_UPDATE_WINDOW = 1000 * 10; // 10 seconds

type StockDashTopProps = {
	symbol: string;
} & WithUserProfileLoaderProps &
	WithMarketLoaderProps;

/**
 * This is the Stock Dashboard's top component. It displays the Stock Graph and
 * holds the search component so the user can resume searching through stocks.
 */
function StockDashTop(props: StockDashTopProps): ReactElement {
	const [stock, setStock] = useState(
		props.marketData.find((stock) => stock.symbol === props.symbol)
	);
	useEffect(() => {
		if (!stock) {
			const find = props.marketData.find((stock) => stock.symbol === props.symbol);
			if (!find) {
				props.searchMarket(props.symbol);
			}
		}
	}, [props.symbol, stock, props.marketData.length]);
	if (!stock) {
		return <div>Loading...</div>;
	}
	// Displays placeholder text if stock is not found
	const [price, setPrice] = useState(stock.currentPrice);
	const displayPrice = price ? price.value.toFixed(2) : '##.##';
	// handles state of pop up for adding stock to watchlist
	const [showAddToWatchlist, setShowAddToWatchlist] = useState(false);

	function updatePrice() {
		const nowMillis = new Date().getTime();
		if (!price || nowMillis - price.lastUpdated > PRICE_UPDATE_WINDOW) {
			priceBackend(props.symbol, PRICE_UPDATE_WINDOW, DEFAULT_PRICE_TIMEOUT).then(
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

	return (
		<div>
			{showAddToWatchlist && (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setShowAddToWatchlist(false)}>
						X
					</button>
					<AddToWatchList />
				</div>
			)}
			<div className="DashTopContain">
				<div className="stockValueContainer">
					<div className="stockGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">
								{/*clicking the button displays the pop up.*/}
								<button
									onClick={() => setShowAddToWatchlist(true)}
									className="addToWatchlistButton">
									+W
								</button>{' '}
								{/* Displays stock ticker and current price */}
								{props.symbol}: <p className="stockValue">${displayPrice}</p>
							</p>
							<StockGraph symbol={props.symbol} />
							{/* Displays graph of stock. */}
						</div>
					</div>
				</div>
				<div className="searchSide">
					<Search />
					{/* Search Component, see SearchColumn.tsx */}
				</div>
			</div>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(StockDashTop));
