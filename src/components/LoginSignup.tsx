import React, { ReactElement, useState } from 'react';
import Login from './login';
import Signup from './signup';
import '../css/home.css';

/**
 * This is the Login/Signup Component. Our login/signup is contained in "one" visual object on
 * the home page. This handles the toggling between Login and Signup within that component the
 * users can see, it saves space in our home page and makes user experience intuitive.
 */
export default function LoginSignup(): ReactElement {
	//hook to set hook state
	const [tabNumber, setTabNumber] = useState(1);

	return (
		<div className="login-signup-container">
			{/* switches between login and signup tab */}
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

			{/* switches between login and signup boxes*/}
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
