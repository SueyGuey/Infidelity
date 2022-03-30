import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css'
import StockDashBottom from './StockDashBottom';
import StockDashTop from './StockDashTop';

function StockDash(props: WithUserProfileLoaderProps): ReactElement {
	const user = userPool.getCurrentUser();
	return user ? (
		<div className = "Dashboard">
			<DashSideMenu/>
			<StockDashTop/>
			<StockDashBottom/>
		</div>
	) : <Navigate to="/"/>;
}

export default withUserProfileLoader(StockDash);
