/**
 * BuySell.tsx
 *
 */

import React, { ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import '../css/BuySell.css';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import BuySellPopup from './BuySellPopup';
import { useParams } from 'react-router-dom';

function BuySell(
	props: WithUserProfileLoaderProps & WithMarketLoaderProps & { symbol: string }
): ReactElement {
	//information from user
	const portfolio = Array.from(props.userProfile.portfolios)[0];
	const asset = Array.from(portfolio.assets).find((asset) => asset.itemSymbol === props.symbol);
	const quantity = asset ? asset.quantity : 0;

	//Gets the price
	const tradeable = props.marketData.find((item) => item.symbol === props.symbol);
	const price = tradeable ? tradeable.currentPrice.value : 0;
	const { buy } = useParams();
	//Enables/disables popup
	const [popUp, setPopUp] = useState(-1);

	const popUpRender = function popUpRender(item: any, popUp: number) {
		if (popUp === -1) {
			return <div></div>;
		} else {
			return (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setPopUp(-1)}>
						X
					</button>
					<BuySellPopup buy={item || popUp} />
				</div>
			);
		}
	};

	return (
		<div id="whole">
			{popUpRender(buy, popUp)}
			<span className="bottomSpan buySell">
				<div className="spanCap">
					<p>Buy/Sell</p>
				</div>
				<div className="buySellContainer">
					<p className="labelSB">
						Shares Owned: <p className="stockValue">{quantity}</p>
					</p>
					<p className="labelSB">
						Valued At: <p className="stockValue">${(quantity * price).toFixed(5)}</p>
					</p>
					<div>
						<button className="buyButton" onClick={() => setPopUp(1)}>
							Buy
						</button>
					</div>
					<div>
						<button className="sellButton" onClick={() => setPopUp(0)}>
							Sell
						</button>
					</div>
				</div>
			</span>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(BuySell));
