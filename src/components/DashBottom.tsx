import React, { ReactElement, useState } from 'react';
import '../css/DashBottom.css';
import '../css/home.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import Portfolio from '../datamodels/Portfolio';
import { useNavigate } from 'react-router-dom';

type DashBottomProps = {
	portfolio: Portfolio;
} & WithUserProfileLoaderProps;

/**
 * This is the bottom half of the user dashboard. It contains the watchlist container,
 * the positions container, and the recent trades container.
 */
function DashBottom(props: DashBottomProps): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);
	console.log(props.portfolio);
	const positions = Array.from(props.portfolio.assets);
	const trades = props.portfolio.transactions.sort((a, b) => {
		return a.timestamp - b.timestamp;
	});
	const [watchToDisplay, setWatchDisplay] = useState(
		watchlists[0] || {
			name: 'RPI CS Watchlist',
			items: [
				{
					symbol: 'MLFD',
					currentPrice: {
						value: 45.63,
					},
				},
				{
					symbol: 'SDD',
					currentPrice: {
						value: 94.55,
					},
				},
				{
					symbol: 'ALGO',
					currentPrice: {
						value: 601.23,
					},
				},
				{
					symbol: 'DS',
					currentPrice: {
						value: 1.98,
					},
				},
			],
		}
	);
	const navigate = useNavigate();
	const handleChangeWL = function handleChangeWL(props: any) {
		const watchlist = Array.from(watchlists).find((watchlist) => watchlist.name === props);
		if (watchlist) {
			setWatchDisplay(watchlist);
		}
	};
	return (
		<div className="dashBottomContain">
			<div className="dashBottom">
				<span className="bottomSpan watchLists">
					<div className="spanCap">
						<p>
							Watchlists
							<select
								className="watchSelect"
								id="dashboardWatchlistSelect"
								onChange={(event) => handleChangeWL(event.target.value)}>
								{/* can select to view a watchlist's stocks from the user's watchlists */}
								{watchlists.map((watchlist) => (
									<option value={watchlist.name} key={watchlist.watchlistId}>
										{watchlist.name}
									</option>
								))}
							</select>
						</p>
					</div>
					<div className="watchlistStocks">
						{Array.from(watchToDisplay.items).map((item) => (
							<div
								className="watchListItems"
								key={item.symbol}
								onClick={() => {
									navigate(`/stockDash/${item.symbol}`);
									// location.reload();
									//navigates to the corresponding stock page when the result is clicked
								}}>
								<p className="watchlist-symbol">{item.symbol.padEnd(6)}</p>
								<p className="watchlist-sep">
									{'  '}|{'  '}
								</p>
								<p className="watchlist-value">
									{item.currentPrice
										? item.currentPrice.value.toFixed(2)
										: '##.##'}
								</p>
								<p className="watchlist-sep">
									{'  '}|{'  '}
								</p>
								<p className="watchlist-value">
									+{' '}
									{(
										-1.32511 +
										(item.currentPrice ? item.currentPrice.value : 0) * 0.1
									).toFixed(2)}
									%
									{/* PLACEHOLDER VALUE ADDED TO PRICE TO GIVE FAKE PERCENT FOR NOW */}
								</p>
							</div>
						))}
						{/* HERE GOES THE STOCKS WITHIN THE SELECTED WATCHLIST */}
					</div>
				</span>
				<span className="bottomSpan positions">
					<div className="spanCap">
						<p>Positions</p>
					</div>
					<div className="positionsItems">
						{/* HERE GOES THE STOCKS WITHIN THE SELECTED WATCHLIST */}
						{positions.map((position) => {
							if (position.quantity !== 0) {
								return (
									<div className="positionItem" key={position.item.symbol}>
										<p className="position-symbol">{position.item.symbol}</p>
										<p className="position-quantity">{position.quantity}</p>
										<p className="position-value">
											{position.value.value.toFixed(2)}
										</p>
									</div>
								);
							}
						})}
					</div>
				</span>
				<span className="bottomSpan recentTrade">
					<div className="spanCap">
						<p>Recent Trades</p>
					</div>
					<div className="recentTradeItems">
						{/* HERE GOES THE STOCKS WITHIN THE SELECTED WATCHLIST */}
						{trades.slice(0, 10).map((trade) => (
							<div className="recentTradeItem" key={trade.transactionId}>
								<p className="recentTradeText">
									{trade.quantity >= 0 ? 'Bought' : 'Sold'}{' '}
									<p
										className="recentTradeQuant"
										style={{ color: trade.quantity >= 0 ? 'green' : 'red' }}>
										{Math.abs(trade.quantity)}
									</p>{' '}
									shares of{' '}
									<p className="recentTradeSymbol">{trade.item.symbol}</p> at{' '}
									<p className="recentTradeValue">${trade.price}</p>
								</p>
							</div>
						))}
					</div>
				</span>
			</div>
		</div>
	);
}

export default withUserProfileLoader(DashBottom);
