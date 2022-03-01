import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import TopNavBar from './TopNavBar';

export default function Dashboard(): ReactElement {
	const user = userPool.getCurrentUser();
	return user ? (
		<div>
			<TopNavBar/>
			<p>Welcome to the Dashboard :)</p>
			<p>Username: {user.getUsername()}</p>
		</div>
	) : <Navigate to="/"/>;
}
