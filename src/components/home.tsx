import React, { ReactElement } from 'react';
import Login from '../components/login';
import TopNavBar from './TopNavBar';

export default function Home(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<p>Infidelity</p>
			<Login />
		</div>
	);
}
