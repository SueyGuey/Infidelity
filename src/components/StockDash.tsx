import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css'
import StockDashBottom from './StockDashBottom';
import StockDashTop from './StockDashTop';

function StockDash(props: WithUserProfileLoaderProps): ReactElement {

	let { symbol } = useParams();

	const user = userPool.getCurrentUser();
	return user ? (
		<div className = "Dashboard">
			<DashSideMenu />
			<StockDashTop symbol={symbol || 'AAPL'}/>
			<StockDashBottom symbol={symbol || 'AAPL'}/>
		</div>
	) : <Navigate to="/"/>;
}

export default withUserProfileLoader(StockDash);
