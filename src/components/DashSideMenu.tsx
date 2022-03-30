import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import TopNavBar from './TopNavBar';
import logo from '../images/logo.png';
import '../css/DashSideMenu.css'
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';

function DashSideMenu(props: WithUserProfileLoaderProps): ReactElement {
    const watchlists = Array.from(props.userProfile.watchlists);
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
                            <li className = "menuItem activePage"><p>Dashboard</p></li>
                            <li className = "menuItem"><p>Trade History</p></li>
                            <li className = "menuItem"><p>Summary</p></li>
                        </ul>
                    </li>
                    <li className = "menuTypeHeader"><p>My Watchlists</p>
                        <ul>
                            {watchlists.map((watchlist) =>
                                <li className = "menuItem"><p>{watchlist.name}</p></li>
                            )}
                        </ul>
                    </li>
                    <li className = "menuTypeHeader"><p>Search & Purchase</p>
                        <ul>
                            <li className = "menuItem"><p>Stock Search</p></li>
                        </ul>
                    </li>
                    <li className = "bottomItem"><p>Profile</p></li>
                    <li className = "bottomItem"><p>Settings</p></li>
                    <li className = "bottomItem logout"><p>Logout</p></li>
                </ul>
            </div>
		</div>
	);
}

export default withUserProfileLoader(DashSideMenu);