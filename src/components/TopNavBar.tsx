import React, { ReactElement } from 'react';
import logo from '../images/logo.png';
import '../css/TopNavBar.css';
import { useNavigate } from 'react-router-dom';
/**
 * TopNavBar.tsx
 * This is the component for the navbar at the top of the screen for the landing page
 */
//A basic navbar with some links to other pages which we will implement eventually
export default function TopNavBar(): ReactElement {
	const navigate = useNavigate();
	return (
		<div className="header">
			<div className="insideHeader">
				<img src={logo} className="logo" />
				<div className="name">
					<p>Infidelity</p>
				</div>
				<ul className="nav">
					<li onClick={() => navigate('/')}>Home</li>
					<li onClick={() => navigate('/About')}>About</li>
					<li onClick={() => navigate('/Features')}>Features</li>
				</ul>
			</div>
		</div>
	);
}
