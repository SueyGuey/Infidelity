import React, { ReactElement, useState } from 'react';
import Login from './login';
import Signup from './signup';
import '../css/home.css';

export default function LoginSignup(): ReactElement {
	const [tabNumber, setTabNumber] = useState(1);

	return (
		<div className="login-signup-container">
			<div className="tabContainer">
				<button
					className={tabNumber === 1 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => setTabNumber(1)}>
					Log In
				</button>
				<button
					className={tabNumber === 2 ? 'tabs active-tabs' : 'tabs'}
					onClick={() => setTabNumber(2)}>
					Sign Up
				</button>
			</div>

			<div className="contentContainer">
				<div className={tabNumber === 1 ? 'content  active-content' : 'content'}>
					<Login />
				</div>
				<div className={tabNumber === 2 ? 'content  active-content' : 'content'}>
					<Signup />
				</div>
			</div>
		</div>
	);
}
