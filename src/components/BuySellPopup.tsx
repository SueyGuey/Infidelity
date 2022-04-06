import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';

type BuySellProps = {
	buy: any;
} & WithUserProfileLoaderProps;

function BuySellPopup(props: BuySellProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const { _active } = useParams();
	return user ? (
		<div className="buySellPopUp">
			<div>
				<button className="x">X</button>
			</div>
			{buyOrSell(props.buy)}
		</div>
	) : (
		<Navigate to="/" />
	);
}

function buyOrSell(isBuy: number) {
	if (isBuy === 0) {
		return (
			<div className="sellContainer">
				<p className="sharePrompt">
					Enter Shares to Sell: <input className="toSellInput"></input>
				</p>
				<p className="totalEst">
					Estimated Total: <p className="estValue">$###.###</p>
				</p>
				<div className="confirmContain">
					<Checkbox />
					<p className="confirmText">Confirm</p>
				</div>
				<button className="doSell">Sell</button>
			</div>
		);
	} else if (isBuy === 1) {
		return (
			<div className="sellContainer">
				<p className="sharePrompt">
					Enter Shares to Buy: <input className="toSellInput"></input>
				</p>
				<p className="totalEst">
					Estimated Total: <p className="estValue">$###.###</p>
				</p>
				<div className="confirmContain">
					<Checkbox />
					<p className="confirmText">Confirm</p>
				</div>
				<button className="doBuy">Buy</button>
			</div>
		);
	} else if (isBuy == 2) {
		// STATE FOR COMPLETION OF SELLING STOCK
	} else if (isBuy == 3) {
		// STATE FOR COMPLETION OF BUYING STOCK
	} else {
		//something has gone wrong state?
	}
}

export default withUserProfileLoader(BuySellPopup);
