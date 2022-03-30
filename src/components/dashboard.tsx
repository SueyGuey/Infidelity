import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css'
import DashTop from './DashTop';
import DashBottom from './DashBottom';

function Dashboard(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	return user ? (
		<div className = "Dashboard">
			<DashSideMenu/>
			<DashTop/>
			<DashBottom/>
		</div>
	) : <Navigate to="/"/>;
}

export default withUserProfileLoader(Dashboard);
