import React, { ReactElement } from 'react';
import PitchRectangles from './PitchRectangles';
import TopNavBar from './TopNavBar';
import '../css/home.css';
import LoginSignup from './LoginSignup';

export default function Home(): ReactElement {
	return (
		<div>
			<TopNavBar/>
			<LoginSignup/>
			<PitchRectangles/>
		</div>
	);
}
