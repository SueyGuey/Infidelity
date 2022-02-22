import React, { ReactElement } from 'react';
import TopNavBar from './TopNavBar';

export default function Dashboard(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<p>Welcome to the Dashboard :)</p>
		</div>
	);
}
