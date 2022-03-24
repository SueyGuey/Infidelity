import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import TopNavBar from './TopNavBar';

function Dashboard(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	return user ? (
		<div>
			<TopNavBar/>
			<p>Welcome to the Dashboard :)</p>
			<p>Username: {user.getUsername()}</p>
		</div>
	) : <Navigate to="/"/>;
}

export default withUserProfileLoader(Dashboard);
