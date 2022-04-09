import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import DashTop from './DashTop';
import DashBottom from './DashBottom';

/*
 * This is the user dashboard. It contains the user's porfolio value, watchlists, positions
 * and recent trades. It also includes a breakdown of portfolio value based on categories
 * if implemented. We also have a search component in the dashboard to easily access and find
 * stocks.
 */

function Dashboard(props: WithUserProfileLoaderProps & { item: string }): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const { active } = useParams();
	return user ? (
		<div className="Dashboard">
			<DashSideMenu active={active || props.item} />
			<DashTop />
			<DashBottom />
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(Dashboard);
