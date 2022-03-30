import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashBottom.css'
import '../css/home.css'
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';

function StockDashBottom(props: WithUserProfileLoaderProps): ReactElement {
    const watchlists = Array.from(props.userProfile.watchlists);
	return(<div className = "dashBottomContain">
        <div className = "dashBottom">
            <span className = "bottomSpan stockInformation">
                <div className = "spanCap">
                    <p>Stock Information</p>
                </div>
            </span>
            <span className = "bottomSpan buySell">
                <div className = "spanCap">
                    <p>Buy/Sell</p>
                </div>
                <div className = "buySellContainer">
                    <p>Shares Owned: <p className = "stockValue">###.##</p></p>
                    <p>Valued At: <p className = "stockValue">$###.##</p></p>
                    <div><button className = "buyButton">Buy</button></div>
                    <div><button className = "sellButton">Sell</button></div>
                </div>
            </span>
        </div>
    </div>)
}

export default withUserProfileLoader(StockDashBottom);