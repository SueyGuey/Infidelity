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

function DashBottom(props: WithUserProfileLoaderProps): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);
	return (
		<div className="dashBottomContain">
			<div className="dashBottom">
				<span className="bottomSpan watchLists">
					<div className="spanCap">
						<p>
							Watchlists
							<select className="watchSelect">
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
