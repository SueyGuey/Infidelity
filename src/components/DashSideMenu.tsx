import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import TopNavBar from './TopNavBar';
import logo from '../images/logo.png';
import '../css/DashSideMenu.css'

export default function DashSideMenu(): ReactElement {
	//const user = userPool.getCurrentUser();
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
                    <li className = "menuTypeHeader"><p>My Statistics</p>
                    <ul>
                        <li className = "menuItem activePage"><p>Dashboard</p></li>
                        <li className = "menuItem"><p>Trade History</p></li>
                        <li className = "menuItem"><p>Summary</p></li>
                    </ul>
                    </li>
                    <li className = "menuTypeHeader"><p>My Watchlists</p>
                    <ul>
                        <li className = "menuItem"><p>Watchlist A</p></li>
                        <li className = "menuItem"><p>Watchlist B</p></li>
                        <li className = "menuItem"><p>Watchlist C</p></li>
                    </ul>
                    </li>
                    <li className = "menuTypeHeader"><p>Search & Purchase</p>
                    <ul>
                        <li className = "menuItem"><p>Stock Search</p></li>
                    </ul>
                    </li>
                    <li className = "bottom"><p>Profile</p></li>
                    <li className = "bottom"><p>Settings</p></li>
                    <li className = "bottom logout"><p>Logout</p></li>
                </ul>
            </div>
		</div>
	);
}