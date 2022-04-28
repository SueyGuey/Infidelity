import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
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
function Dashboard(props: WithUserProfileLoaderProps & { item: string }): ReactElement {
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

	// update portfolio every minute and at the start of the app
	useEffect(() => {
		updatePorfolio();
		const interval = setInterval(updatePorfolio, MINUTE);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="Dashboard">
			<DashSideMenu active={active || props.item} />
			<DashTop portfolio={portfolio} setPortfolio={setPortfolio} />
			<DashBottom portfolio={portfolio} />
		</div>
	);
}

export default withUserProfileLoader(Dashboard);
