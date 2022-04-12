import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashBottom.css';
import '../css/home.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import { getActivePortfolio } from '../datamodels/User';
import Portfolio from '../datamodels/Portfolio';

type DashBottomProps = {
	portfolio: Portfolio;
} & WithUserProfileLoaderProps;

/**
 * This is the bottom half of the user dashboard. It contains the watchlist container,
 * the positions container, and the recent trades container.
 */
function DashBottom(props: DashBottomProps): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);

	const positions = Array.from(props.portfolio.assets);
	const trades = props.portfolio.transactions.sort((a, b) => {
		return a.timestamp - b.timestamp;
	});

	return (
		<div className="dashBottomContain">
			<div className="dashBottom">
				<span className="bottomSpan watchLists">
					<div className="spanCap">
						<p>
							Watchlists
							<select className="watchSelect">
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
							return (
								<div className="positionItem" key={position.item.symbol}>
									<p>{position.item.symbol}</p>
									<p>{position.quantity}</p>
									<p>{position.value.value.toFixed(2)}</p>
								</div>
							);
						})}
					</div>
				</span>
				<span className="bottomSpan recentTrade">
					<div className="spanCap">
						<p>Recent Trades</p>
					</div>
					<div className="recentTradeItems">
						{/* HERE GOES THE STOCKS WITHIN THE SELECTED WATCHLIST */}
						{trades.map((trade) => (
							<div className="recentTradeItem" key={trade.transactionId}>
								<p>
									Bought {trade.quantity} shares of {trade.item.symbol} at $
									{trade.price}
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
