import React, { ReactElement } from 'react';
import Login from './login';

export default function Home(): ReactElement {
	return (
		<div>
			<p>Infidelity</p>
			<Login />
		</div>
	);
}
