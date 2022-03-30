import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashBottom.css'
import '../css/home.css'
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import BuySell from './BuySell';

function StockDashBottom(props: WithUserProfileLoaderProps): ReactElement {
    const watchlists = Array.from(props.userProfile.watchlists);
	return(<div className = "dashBottomContain">
        <div className = "dashBottom">
            <span className = "bottomSpan stockInformation">
                <div className = "spanCap">
                    <p>Stock Information</p>
                </div>
            </span>
            <BuySell />
        </div>
    </div>)
}

export default withUserProfileLoader(StockDashBottom);