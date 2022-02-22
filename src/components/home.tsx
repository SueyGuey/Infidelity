import React, { ReactElement, useState } from 'react';
import Login from '../components/login';
import Signup from './Signup';
import TopNavBar from './TopNavBar';
import '../css/home.css';

export default function Home(): ReactElement {
	const [tabNumber, setTabNumber] = useState(1);

	return (
		<div>
			<TopNavBar/>
			<div className="bloc-tabs">
				<button
				className={tabNumber === 1 ? "tabs active-tabs" : "tabs"}
				onClick={() => setTabNumber(1)}>
					Log In
				</button>
				<button
				className={tabNumber === 2 ? "tabs active-tabs" : "tabs"}
				onClick={() => setTabNumber(2)}>
					Sign Up
				</button>
			</div>
			
			<div className="content-tabs">
				<div className={tabNumber === 1 ? "content  active-content" : "content"}>
					<Login />
				</div>

				<div
				className={tabNumber === 2 ? "content  active-content" : "content"}
				>
					<Signup/>
				</div>
			</div>
		</div>
	);
}
