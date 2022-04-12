import React, { ReactElement, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashBottom.css';
import '../css/home.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import dashboard from './dashboard';

/*
 * This is the bottom half of the user dashboard. It contains the watchlist container,
 * the positions container, and the recent trades container.
 */

function DashBottom(props: WithUserProfileLoaderProps): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);
	const [watchToDisplay, setWatchDisplay] = useState(watchlists[0]);
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
									{item.currentPrice.value.toFixed(5)}
								</p>
								<p className="watchlist-sep">
									{'  '}|{'  '}
								</p>
								<p className="watchlist-value">
									+ {(-1.32511 + item.currentPrice.value * 0.1).toFixed(2)}%
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
					</div>
				</span>
				<span className="bottomSpan recentTrade">
					<div className="spanCap">
						<p>Recent Trades</p>
					</div>
					<div className="recentTradeItems">
						{/* HERE GOES THE STOCKS WITHIN THE SELECTED WATCHLIST */}
					</div>
				</span>
			</div>
		</div>
	);
}

export default withUserProfileLoader(DashBottom);
