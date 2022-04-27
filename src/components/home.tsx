import React, { ReactElement, useEffect } from 'react';
import PitchRectangles from './PitchRectangles';
import TopNavBar from './TopNavBar';
import '../css/home.css';
import LoginSignup from './LoginSignup';
import StockGraph from './StockGraph';
import stockImage2 from '../images/stock-image-2-upgraph.jpg';
import '../css/InfoPages-css/aboutPage.css';

//our landing page
export default function Home(): ReactElement {
	useEffect(() => {
		document.body.style.overflowY = 'auto';
	}, []);
	return (
		<div>
			<img className="backgroundWhole featureImg" src={stockImage2} />
			{/* Navigation bar for navigation to non-app informational pages */}
			<TopNavBar />
			<div className="top">
				<LoginSignup />
				{/* The login and sign up container, togglable between login and sign up */}
				<span className="top-2">
					<div className="graph" id="graph-container">
						<p className="stockName"> S&P 500</p>
						{/* the 'example' graph shown on the front page */}
						<StockGraph symbol="SPY" days={1826} />
					</div>
				</span>
			</div>
			<div className="bottom">
				<PitchRectangles />
				{/* Pitch Rectangles display quick summaries of what infidelity aims to do to draw user in */}
			</div>
		</div>
	);
}
