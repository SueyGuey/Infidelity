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
			<LoginSignup/>
			<div className='graph'>
				<p className='stockName'> MSFT</p>
				<StockGraph/>
			</div>
			<PitchRectangles/>
		</div>
	);
}
