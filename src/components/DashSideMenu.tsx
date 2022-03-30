import React, { ReactElement } from 'react';
import logo from '../images/logo.png';
import '../css/DashSideMenu.css'
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import { Navigate, useNavigate } from 'react-router-dom';

function DashSideMenu(props: WithUserProfileLoaderProps): ReactElement {
    const watchlists = Array.from(props.userProfile.watchlists);
    const navigate = useNavigate();
	return(
		<div className = "SideMenuContainer">
            <div className = "logoName">
                <img src= {logo} className = "sideLogo"/>
                    <div className='name' >
                        <p className = 'sideBarName'>Infidelity</p>
                    </div>
                
            </div>
            <div className = "menu">
                <ul>
                    <li className = "menuTypeHeader">
                        <p>My Statistics</p>
                        <ul>
                            <li className = "menuItem activePage" onClick = {() => navigate(`/dashboard`)}><p>Dashboard</p></li>
                            <li className = "menuItem" onClick = {() => navigate(`/dashboard/tradeHistory`)}><p>Trade History</p></li>
                            <li className = "menuItem" onClick = {() => navigate(`/dashboard/summary`)}><p>Summary</p></li>
                        </ul>
                    </li>
                    <li className = "menuTypeHeader"><p>My Watchlists</p>
                        <ul>
                            {watchlists.map((watchlist) =>
                                <li className = "menuItem"
                                    key={watchlist.watchlistId}>
                                    <p>{watchlist.name}</p>
                                </li>
                            )}
                        </ul>
                    </li>
                    <li className = "menuTypeHeader" onClick = {() => navigate(`/dashboard/searchLarge`)}><p>Search & Purchase</p>
                        <ul>
                            <li className = "menuItem"><p>Stock Search</p></li>
                        </ul>
                    </li>
                    <li className = "bottomItem" onClick = {() => navigate(`/dashboard/profile`)}><p>Profile</p></li>
                    <li className = "bottomItem" onClick = {() => navigate(`/dashboard/settings`)}><p>Settings</p></li>
                    <li className = "bottomItem logout" onClick = {() => navigate(`/`)}><p>Logout</p></li> {/*Definitley not normal logout procedure. It 'works' only visually */}
                </ul>
            </div>
		</div>
	);
}

export default withUserProfileLoader(DashSideMenu);