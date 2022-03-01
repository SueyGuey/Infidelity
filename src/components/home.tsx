import React, { ReactElement } from 'react';
import Login from './login';
import Signup from './signup';
import TopNavBar from './TopNavBar';

export default function Home(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<p>Infidelity</p>
			<Login />
			<Signup />
		</div>
	);
}
