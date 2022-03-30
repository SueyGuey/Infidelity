import React, { ReactElement } from 'react';
import '../css/DashBottom.css'
import '../css/home.css'
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import BuySell from './BuySell';

function StockDashBottom(props: WithUserProfileLoaderProps & {symbol: string}): ReactElement {
	return(<div className = "dashBottomContain">
        <div className = "dashBottom">
            <span className = "bottomSpan stockInformation">
                <div className = "spanCap">
                    <p>Stock Information</p>
                </div>
                <div className = "stockInformationItems"></div>
            </span>
            <BuySell symbol={props.symbol}/>
        </div>
    </div>)
}

export default withUserProfileLoader(StockDashBottom);