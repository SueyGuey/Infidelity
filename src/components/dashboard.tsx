import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css'
import DashTop from './DashTop';
import DashBottom from './DashBottom';

function Dashboard(props: WithUserProfileLoaderProps & {item: string}): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	let { active } = useParams();
	return user ? (
		<div className = "Dashboard">
			<DashSideMenu active = {active || props.item}/>
			<DashTop/>
			<DashBottom/>
		</div>
	) : <Navigate to="/"/>;
}

export default withUserProfileLoader(Dashboard);
