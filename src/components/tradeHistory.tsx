import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/TradeHistory.css';
import DashTop from './DashTop';
import DashBottom from './DashBottom';
import { getActivePortfolio } from '../datamodels/User';
import { loadPortfolioBackend } from '../endpoints';
import { HOUR, isRecent, MINUTE } from '../utils/timeUtils';

/**
 * This is the user dashboard. It contains the user's porfolio value, watchlists, positions
 * and recent trades. It also includes a breakdown of portfolio value based on categories
 * if implemented. We also have a search component in the dashboard to easily access and find
 * stocks.
 */
function TradeHistory(props: WithUserProfileLoaderProps & { item: string }): ReactElement {
	if (!userPool.getCurrentUser()) {
		return <Navigate to="/login" />;
	}
	const { active } = useParams();

	const [portfolio, setPortfolio] = useState(getActivePortfolio(props.userProfile));

	const portfolioValue = portfolio.totalValue;

	function updatePorfolio() {
		if (!portfolioValue || !isRecent(portfolioValue.lastUpdated, MINUTE)) {
			loadPortfolioBackend(props.userProfile.username, portfolio.name).then((res) => {
				setPortfolio(res);
			});
		}
	}
	const trades = portfolio.transactions.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});
	// update portfolio every minute and at the start of the app
	useEffect(() => {
		updatePorfolio();
		const interval = setInterval(updatePorfolio, MINUTE);
		return () => clearInterval(interval);
	}, []);

	function toDateTrade(props: number) {
		const date = new Date(props);
		return (
			<div className="dateTime">
				<p>
					{date.getMonth() +
						1 +
						'/' +
						date.getDate() +
						'/' +
						date.getFullYear() +
						' ' +
						date.getHours() +
						':' +
						date.getMinutes() +
						':'}
					{date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}
				</p>
			</div>
		);
	}
	return (
		<div className="Dashboard">
			<DashSideMenu active={active || props.item} />
			<div className="fullTradePortfolioHistory">
				<div className="historyContainer">
					<p className="historyLabel">Trade history for {portfolio.name}</p>
					<div className="recentTradeItem">
						<p className="recentTradeText">
							<p className="five-vw date t">Date</p>
							<p className="five-vw t">Bought/Sold</p>
							<p className="five-vw t">Quantity</p>
							<p className="five-vw t">Stock Symbol</p>
							<p className="five-vw t">Value per share</p>
							<p className="five-vw t">Total</p>
						</p>
					</div>
					{trades.map((trade) => (
						<div className="recentTradeItem" key={trade.transactionId}>
							{toDateTrade(trade.timestamp)}
							<p className="textT">
								<p
									className={
										'five-vw h ' + (trade.quantity >= 0 ? 'Bought' : 'Sold')
									}>
									{trade.quantity >= 0 ? 'Bought' : 'Sold'}
								</p>
								<p className="five-vw h">{Math.abs(trade.quantity).toString()}</p>
								<p className="five-vw h">{trade.item.symbol.padEnd(6, ' ')}</p>
								<p className="five-vw h">${trade.price.toString()}</p>
								<p className="five-vw b">
									{trade.price * -1 * trade.quantity < 0 ? '-' : '+'}$
									{Math.abs(trade.price * trade.quantity)
										.toFixed(15)
										.toString()}
								</p>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default withUserProfileLoader(TradeHistory);
