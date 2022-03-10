import React, { ReactElement, useState } from 'react';
import Login from './login';
import Signup from './signup';
import PitchRectangles from './PitchRectangles';
import TopNavBar from './TopNavBar';
import '../css/home.css';

export default function Home(): ReactElement {
	const [tabNumber, setTabNumber] = useState(1);

	return (
		<div>
			<TopNavBar/>
			<div className='container'>
				<div className="tabContainer">
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
				
				<div className="contentContainer">
					<div className={tabNumber === 1 ? "content  active-content" : "content"}>
						<Login />
					</div>
					<div className={tabNumber === 2 ? "content  active-content" : "content"}>
						<Signup/>
					</div>
				</div>
			</div>
      <PitchRectangles/>
		</div>
	);
}
