/**
 * BuySell.tsx
 * Contains the component for buying and selling a tradeable
 */

import React, { ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import '../css/BuySell.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import BuySellPopup from './BuySellPopup';
import { Tradeable } from '../datamodels/Portfolio';

type BuySellProps = {
	item: Tradeable;
} & WithUserProfileLoaderProps &
	WithMarketLoaderProps;

function BuySell(props: BuySellProps): ReactElement<BuySellProps> {
	//information from user
	// TODO: change this [0] to the user's active portfolio
	const portfolio = Array.from(props.userProfile.portfolios)[0];
	const asset = Array.from(portfolio.assets).find(
		(asset) => asset.itemSymbol === props.item.symbol
	);
	const sharesOwned = asset ? asset.quantity : 0;

	//Gets the price
	const price = props.item.currentPrice ? props.item.currentPrice.value : 0;

	// Enables/disables popup and specifies the type of popup
	const [menuType, setMenuType] = useState<'' | 'buy' | 'sell'>('');

	return (
		<div id="whole">
			{menuType !== '' && (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setMenuType('')}>
						X
					</button>
					<BuySellPopup type={menuType} item={props.item} />
				</div>
			)}
			<span className="bottomSpan buySell">
				<div className="spanCap">
					<p>Buy/Sell</p>
				</div>
				<div className="buySellContainer">
					<p className="labelSB">
						Shares Owned: <p className="stockValue">{sharesOwned}</p>
					</p>
					<p className="labelSB">
						Valued At: <p className="stockValue">${(sharesOwned * price).toFixed(2)}</p>
					</p>
					<div>
						<button className="buyButton" onClick={() => setMenuType('buy')}>
							{/*Displays BUY version of pop up*/}
							Buy
						</button>
					</div>
					<div>
						<button className="sellButton" onClick={() => setMenuType('sell')}>
							{/*Displays SELL version of pop up*/}
							Sell
						</button>
					</div>
				</div>
			</span>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(BuySell));
