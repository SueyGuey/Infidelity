import React, { ReactElement } from 'react';
import Login from '../components/login';

export default function Home(): ReactElement {
	return (
		<div>
			<p>Infidelity</p>
			<Login />
		</div>
	);
}
