import { ReactElement } from 'react';
import logo from '../images/logo.png';
import '../css/TopNavBar.css';

export default function TopNavBar(): ReactElement {
	return (
		<div className="header">
			<div className="insideHeader">
				<img src={logo} className="logo" />
				<div className="name">
					<p>Infidelity</p>
				</div>
				<ul className="nav">
					<li>About</li>
					<li>Product</li>
					<li>Features</li>
					<li>Nav4</li>
					<li>Nav5</li>
				</ul>
			</div>
		</div>
	);
}
