/**
 * TransactionComplete.tsx
 * The confirmation pop ip saying that the transaction was complete as well as
 * some info about the transaction which just completed.
 */

import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';

//A popup displaying the price and amount you just bought or sold a tradeable for with a total value
function TransactionCompletePop(props: WithUserProfileLoaderProps & { buy: any }): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="buySellConfirmationPopUp">
			{/* <div><button className = "x">X</button></div> */}
			<div className="sellContainer">
				{buyOrSellConfirm(props.buy)}
				<p>
					At <p className="estValue"> $###.##</p> per share
				</p>
				<p>
					Totaling: <p className="estValue"> $###,###.##</p> infiDollars
				</p>
				<button className="doClose">Keep Trading</button>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
}

//Confirmation page for buying/selling a 'number' amount of shares at a certain price
function buyOrSellConfirm(isBuy: number) {
	if (isBuy === 0) {
		return (
			<p className="totalEst">
				Congratulations! You have sold: <br /> <p className="estValue">$###.###</p> Shares
				of {}
			</p>
		);
	} else if (isBuy === 1) {
		return (
			<p className="totalEst">
				Congratulations! You have purchased: <br /> <p className="estValue">$###.###</p>{' '}
				Shares of {}
			</p>
		);
	} else if (isBuy == 2) {
		// STATE FOR COMPLETION OF SELLING STOCK
	} else if (isBuy == 3) {
		// STATE FOR COMPLETION OF BUYING STOCK
	} else {
		//something has gone wrong state?
	}
}

export default withUserProfileLoader(TransactionCompletePop);
