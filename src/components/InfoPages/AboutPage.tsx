import React, { ReactElement, useEffect } from 'react';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../TopNavBar';
import '../../css/InfoPages-css/aboutPage.css';
import stockImage1 from '../../images/stock-image-stocks.jpg';
import stockImage2 from '../../images/stock-image-2-upgraph.jpg';
import stockImage3 from '../../images/stock-image-wallstreet.jpg';
export default function AboutPage() {
	useEffect(() => {
		document.body.style.overflowY = 'hidden';
	}, []);
	return (
		<div className="aboutPage">
			<img className="backgroundWhole" src={stockImage2} />
			<TopNavBar />
			<div className="info-image">
				<img src={stockImage3} />
			</div>
			<div className="info-about">
				<h1>TITLE</h1>
				<p className="aboutText">
					Welcome to infidelity.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat
					pellentesque adipiscing commodo elit at imperdiet dui accumsan. Urna condimentum
					mattis pellentesque id nibh tortor id aliquet lectus. Dolor sit amet consectetur
					adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
					<br />
					<br />
				</p>
			</div>
			<div className="info-about-2" id="secondOne">
				<h1>TITLE</h1>
				<p className="aboutText">
					Welcome to infidelity.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat
					pellentesque adipiscing commodo elit at imperdiet dui accumsan. Urna condimentum
					mattis pellentesque id nibh tortor id aliquet lectus. Dolor sit amet consectetur
					adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus.
				</p>
			</div>
			<div className="info-about-bottom">
				<img src={stockImage1} />
				<h1>TITLE BUT AGAIN</h1>
				<p className="aboutText">
					Welcome to infidelity.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat
					pellentesque adipiscing commodo elit at imperdiet dui accumsan. Urna condimentum
					mattis pellentesque id nibh tortor id aliquet lectus. Dolor sit amet consectetur
					adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
					<br />
					<br />
				</p>
			</div>
		</div>
	);
}
