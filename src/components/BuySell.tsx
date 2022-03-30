import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';
import '../css/BuySell.css';

export default function BuySell(): ReactElement {
    return(
        <div className='BuySellContainer'> 
            <div className='Header'>
                <p className='headerText'>Buy/Sell</p>
            </div>
            <div className='info'>
                <p>Shares Owned:</p>
                <p>Valued At:</p>
                <Button variant="contained" className = "BuyButton">Buy</Button>
                <br/> <br/>
                <Button variant="contained" className = "SellButton">Sell</Button>
            </div>
        </div>
    )
}

