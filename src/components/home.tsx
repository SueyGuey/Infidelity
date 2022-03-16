import React, { ReactElement } from 'react';
import PitchRectangles from './PitchRectangles';
import TopNavBar from './TopNavBar';
import '../css/home.css';
import LoginSignup from './LoginSignup';
import StockGraph from './StockGraph';

export default function Home(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<div className = 'top'>
			<LoginSignup/>
			<span className = 'top-2'>
				<div className='graph'>
					<p className='stockName'> MSFT</p>
					<StockGraph/>
				</div>
			</span>
			</div>
			<PitchRectangles/>
		</div>
	);
}
