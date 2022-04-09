import React, { ReactElement, useState } from 'react';
import logo from '../images/logo.png';
import '../css/DashSideMenu.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import { Navigate, useNavigate } from 'react-router-dom';
import AddWatchlistPop from './AddWatchlistPop';
/**
 * This file contains the dashboard side menu. It is persistant amongst the user's dashboard,
 * as well as individual stock pages.
 */

//highlights the current active page on the side-menu.
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

//the side menu component.
function DashSideMenu(props: WithUserProfileLoaderProps & { active: string }): ReactElement {
	const watchlists = Array.from(props.userProfile.watchlists);
	const navigate = useNavigate();
	const active = props.active;
	const [watchPopUp, setWatchPop] = useState(-1);
	setActive(active);

	/**
	 * This handles whether or not do display the "add new watchlist" pop up, togglable when the '+'
	 * button is pressed from the side-menu next to 'My Watchlists'
	 * */
	const popUpHandler = function popUpHandler(props: any) {
		if (props === -1) {
			return <div></div>;
		} else {
			return (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setWatchPop(-1)}>
						X
					</button>
					<AddWatchlistPop />
				</div>
			);
		}
	};

	return (
		<div>
			{popUpHandler(watchPopUp)}
			{/* The pop up, like most pop ups specific to a page are in the outer div*/}
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
									{' '}
									{/*Navigates back to user dashboard*/}
									<p>Dashboard</p>
								</li>
								<li
									id="tradeHistory"
									className="menuItem"
									onClick={() => navigate(`/dashboard/tradeHistory`)}>
									{' '}
									{/*Navigates to user trade history (not promised)*/}
									<p>Trade History</p>
								</li>
								<li
									id="summary"
									className="menuItem"
									onClick={() => navigate(`/dashboard/summary`)}>
									{' '}
									{/*Navigates to user summary (not promised)*/}
									<p>Summary</p>
								</li>
							</ul>
						</li>
						<li className="menuTypeHeader">
							<p>
								My Watchlists
								<button
									className="addWatchlistButton"
									onClick={() => setWatchPop(0)}>
									{' '}
									{/*The add watchlist button*/}
									<p>+</p>
								</button>
							</p>
							<ul>
								{watchlists.map((watchlist) => (
									<li className="menuItem" key={watchlist.watchlistId}>
										<p>{watchlist.name}</p>
									</li>
								))}{' '}
								{/* Displays available watchlists.*/}
							</ul>
						</li>
						<li
							className="menuTypeHeader"
							onClick={() => navigate(`/dashboard/searchLarge`)}>
							{/*If implemented, navigates to a page specifically for searching. Also highlighted if on a stock page.*/}
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
							{' '}
							{/*navigates to user profile when implented*/}
							<p>Profile</p>
						</li>
						<li
							id="settings"
							className="bottomItem"
							onClick={() => navigate(`/dashboard/settings`)}>
							{' '}
							{/*navigates to user profile if implented*/}
							<p>Settings</p>
						</li>
						<li id="logout" className="bottomItem logout" onClick={() => navigate(`/`)}>
							{' '}
							{/*currently just navigates to front page*/}
							<p>Logout</p>
						</li>{' '}
						{/*Definitley not normal logout procedure. It 'works' only visually */}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default withUserProfileLoader(DashSideMenu);
