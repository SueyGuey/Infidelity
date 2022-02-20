import React, { ReactElement } from 'react';
import Login from '../components/login';
import Signup from './Signup';
import TopNavBar from './TopNavBar';

export default function Home(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<p>Infidelity</p>
			<Login />
			<Signup/>
		</div>
	);
}
