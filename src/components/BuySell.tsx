import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import '../css/BuySell.css';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import BuySellPopup from './BuySellPopup';
import { useParams } from 'react-router-dom';

function BuySell(props: WithUserProfileLoaderProps & WithMarketLoaderProps & {symbol: string}): ReactElement {
    const portfolio = Array.from(props.userProfile.portfolios)[0];
    const asset = Array.from(portfolio.assets).find(asset => asset.itemSymbol === props.symbol);
    const quantity = asset ? asset.quantity : 0;
    
    const tradeable = props.marketData.find(item => item.symbol === props.symbol);
    const price = tradeable ? tradeable.currentPrice.value : 0;
    let {buy} = useParams();
    return (
        <span className = "bottomSpan buySell">
            <div className = "spanCap">
                <p>Buy/Sell</p>
            </div>
            <div className = "buySellContainer">
                <p className = "labelSB">Shares Owned: <p className = "stockValue">{quantity}</p></p>
                <p className = "labelSB">Valued At: <p className = "stockValue">${(quantity * price).toFixed(5)}</p></p>
                <div><button className = "buyButton" onClick = {() => buyStockPopUp(buy,1)}>Buy</button></div>
                <div><button className = "sellButton" onClick = {() => buyStockPopUp(buy,0)}>Sell</button></div>
            </div>
        </span>
    );
}

function buyStockPopUp(buy: any, isBuy: any){
    return(
       <BuySellPopup buy = {buy || isBuy}/>
    )
}


export default withMarketLoader(withUserProfileLoader(BuySell));