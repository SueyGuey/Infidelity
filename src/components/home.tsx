import React, { ReactElement, useState } from 'react';
import '../css/home.css';
import Login from '../components/login';
import PitchRectangles from './PitchRectangles';
import Signup from './Signup';
import TopNavBar from './TopNavBar';
import StockGraph from './StockGraph';

export default function Home(): ReactElement {
	const [tabNumber, setTabNumber] = useState(1);

	return (
		<div>
			<TopNavBar/>
			<div className='container'>
				<div className='LoginSignup'>
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
				<div className='graph'>
					<p className='stockName'> MSFT</p>
					<StockGraph/>
				</div>
			</div>
    	<PitchRectangles/>
		</div>
	);
}
