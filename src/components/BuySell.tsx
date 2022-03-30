import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import '../css/BuySell.css';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';

function BuySell(props: WithUserProfileLoaderProps & WithMarketLoaderProps): ReactElement {
    const symbol = 'AAPL';
    const portfolio = Array.from(props.userProfile.portfolios)[0];
    const asset = Array.from(portfolio.assets).find(asset => asset.itemSymbol === symbol);
    const quantity = asset ? asset.quantity : 0;
    
    const tradeable = props.marketData.find(item => item.symbol === symbol);
    const price = tradeable ? tradeable.currentPrice.value : 0;
    return (
        <span className = "bottomSpan buySell">
            <div className = "spanCap">
                <p>Buy/Sell</p>
            </div>
            <div className = "buySellContainer">
                <p>Shares Owned: <p className = "stockValue">{quantity}</p></p>
                <p>Valued At: <p className = "stockValue">${quantity * price}</p></p>
                <div><button className = "buyButton">Buy</button></div>
                <div><button className = "sellButton">Sell</button></div>
            </div>
        </span>
    );
}

export default withMarketLoader(withUserProfileLoader(BuySell));