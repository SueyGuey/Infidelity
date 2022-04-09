/**
 * StockDash.tsx
 * Dashboard page containing all components related
 */

import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import StockDashBottom from './StockDashBottom';
import StockDashTop from './StockDashTop';
import BuySellPopup from './BuySellPopup';

/**
 * This is the StockDash component. It is visually similar to the style of the user dashboard.
 * The Side menu remains persistant in all stock pages to allow for seemless traversal back to
 * the user dashboard or any relevant implemented pages. It also contains a search container to
 * continue navigating through stocks easily on user whim.
 *
 * Contains the graphical information of stock price, stock information and the buy and sell
 * section. (See BuySell.tsx, BuySellPopup.tsx)
 */

function StockDash(props: WithUserProfileLoaderProps): ReactElement {
	const { symbol } = useParams();
	const { active } = useParams();

	//Displays user's portfolio or apple if they are logged in
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="Dashboard">
			<DashSideMenu active={active || 'searchLarge'} />
			<StockDashTop symbol={symbol || 'AAPL'} />
			<StockDashBottom symbol={symbol || 'AAPL'} />
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(StockDash);
