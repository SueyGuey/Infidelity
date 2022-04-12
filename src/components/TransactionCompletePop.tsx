/**
 * TransactionComplete.tsx
 * The confirmation pop ip saying that the transaction was complete as well as
 * some info about the transaction which just completed.
 */

import React, { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';

//A popup displaying the price and amount you just bought or sold a tradeable for with a total value
function TransactionCompletePop(
	props: WithUserProfileLoaderProps & {
		buy: any;
		numStock: any;
		stockPrice: any;
		stockSymbol: any;
	}
): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const [statePop, setStatePop] = useState(0);
	const renderFunction = function renderFunction(state: number) {
		if (state !== 0) {
			location.reload();
		}
		return (
			<div className="buySellConfirmationPopUp">
				{/* <div><button className = "x">X</button></div> */}
				<div className="sellContainer">
					{buyOrSellConfirm(props.buy, props.numStock, props.stockSymbol)}
					<p>
						At <p className="estValue"> ${parseFloat(props.stockPrice)}</p> per share
					</p>
					<p>
						Totaling:{' '}
						<p className="estValue">
							{' '}
							${parseFloat(props.stockPrice) * props.numStock}
						</p>{' '}
						infiDollars
					</p>
					<button onClick={() => setStatePop(-1)} className="doClose">
						Keep Trading
					</button>
				</div>
			</div>
		);
	};
	return user ? renderFunction(statePop) : <Navigate to="/" />;
}

//Confirmation page for buying/selling a 'number' amount of shares at a certain price
function buyOrSellConfirm(isBuy: number, numStock: number, stockSymbol: string) {
	if (isBuy === 0) {
		return (
			<p className="totalEst">
				Congratulations! You have sold: <br /> <p className="estValue">{numStock} </p>{' '}
				Shares of {stockSymbol}
			</p>
		);
	} else if (isBuy === 1) {
		return (
			<p className="totalEst">
				Congratulations! You have purchased: <br /> <p className="estValue">{numStock} </p>
				Shares of {stockSymbol}
			</p>
		);
	}
}

export default withUserProfileLoader(TransactionCompletePop);
