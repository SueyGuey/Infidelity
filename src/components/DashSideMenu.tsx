import React, { ReactElement } from 'react';
import logo from '../images/logo.png';
import '../css/DashSideMenu.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import { Navigate, useNavigate } from 'react-router-dom';

function setActive(activeID: string) {
	const x = document.getElementsByClassName('menuItem');
	const y = document.getElementsByClassName('bottomItem');

	for (let i = 0; i < x.length; i++) {
		if (x[i].id == activeID) {
			x[i].classList.add('activePage');
		} else {
			x[i].classList.remove('activePage');
		}
	}

	for (let i = 0; i < y.length; i++) {
		if (y[i].id == activeID) {
			y[i].classList.add('activePage');
		} else {
			y[i].classList.remove('activePage');
		}
	}
}

function DashSideMenu(props: WithUserProfileLoaderProps & { active: string }): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);
	const navigate = useNavigate();
	const active = props.active;
	setActive(active);
	return (
		<div className="SideMenuContainer">
			<div className="logoName">
				<img src={logo} className="sideLogo" />
				<div className="name">
					<p className="sideBarName">Infidelity</p>
				</div>
			</div>
			<div className="menu">
				<ul>
					<li className="menuTypeHeader">
						<p>My Statistics</p>
						<ul>
							<li
								id="dashboard"
								className="menuItem activePage"
								onClick={() => navigate(`/dashboard`)}>
								<p>Dashboard</p>
							</li>
							<li
								id="tradeHistory"
								className="menuItem"
								onClick={() => navigate(`/dashboard/tradeHistory`)}>
								<p>Trade History</p>
							</li>
							<li
								id="summary"
								className="menuItem"
								onClick={() => navigate(`/dashboard/summary`)}>
								<p>Summary</p>
							</li>
						</ul>
					</li>
					<li className="menuTypeHeader">
						<p>My Watchlists</p>
						<ul>
							{watchlists.map((watchlist) => (
								<li className="menuItem" key={watchlist.watchlistId}>
									<p>{watchlist.name}</p>
								</li>
							))}
						</ul>
					</li>
					<li
						className="menuTypeHeader"
						onClick={() => navigate(`/dashboard/searchLarge`)}>
						<p>Search & Purchase</p>
						<ul>
							<li id="searchLarge" className="menuItem">
								<p>Stock Search</p>
							</li>
						</ul>
					</li>
					<li
						id="profile"
						className="bottomItem"
						onClick={() => navigate(`/dashboard/profile`)}>
						<p>Profile</p>
					</li>
					<li
						id="settings"
						className="bottomItem"
						onClick={() => navigate(`/dashboard/settings`)}>
						<p>Settings</p>
					</li>
					<li id="logout" className="bottomItem logout" onClick={() => navigate(`/`)}>
						<p>Logout</p>
					</li>{' '}
					{/*Definitley not normal logout procedure. It 'works' only visually */}
				</ul>
			</div>
		</div>
	);
}

export default withUserProfileLoader(DashSideMenu);
