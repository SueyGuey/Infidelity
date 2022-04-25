import React, { ReactElement, useState } from 'react';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';
import { makeTradeBackend } from '../endpoints';
import { getActivePortfolio } from '../datamodels/User';
import { Tradeable } from '../datamodels/Portfolio';
import TransactionCompletePop from './TransactionCompletePop';

type BuySellProps = {
	item: Tradeable;
	type: 'buy' | 'sell';
} & WithUserProfileLoaderProps;

/**
 * This is the Buy-Sell pop up component. This file is what constructs either a buy or sell
 * version of the BuySellPopUp depending on which button is clicked on the stock page.
 * This, when hooked up to the backend, will provide the shares to buy or sell to the backend
 * if the user has made a valid sale or purchase of that stock.
 * */
function BuySellPopup(props: BuySellProps): ReactElement<BuySellProps> {
	const [confirmed, setConfirmed] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [quantity, setQuantity] = useState(0);
	const portfolio = getActivePortfolio(props.userProfile);

	const hasPrice = props.item.currentPrice !== undefined;

	const price = props.item.currentPrice ? props.item.currentPrice.value : 0;
	const estimatedTotal = quantity * price;
	const displayTotal = hasPrice ? estimatedTotal.toFixed(2) : '##.##';
	function handleSubmit() {
		let valid = false;
		if (props.type == 'buy') {
			valid = doPurchase(price, quantity);
		} else {
			valid = doSale(price, quantity);
		}

		if (valid === true) {
			console.log('submitting transaction request');
			setSubmitted(true);
			makeTradeBackend({
				username: props.userProfile.username,
				itemSymbol: props.item.symbol,
				portfolioName: portfolio.name,
				quantity: props.type === 'buy' ? quantity : -quantity,
				timestamp: Date.now(),
			}).then((res) => {
				console.log('trade result: ', res);
				setCompleted(true);
			});
		}
	}

	function doSale(price: any, numStocks: number) {
		const totalPrice = parseFloat(price) * numStocks;
		const numSold = numStocks;
		let totalOwned = Array.from(portfolio.assets).find(
			(asset) => asset.item.symbol === props.item.symbol
		)?.quantity;
		if (totalOwned == undefined) {
			totalOwned = 0;
		}
		//if you have the stock you're trying to sell, you can sell.
		if (numSold > totalOwned && numSold > 0) {
			alert('cannot do sale. Insufficient Quantity');
			return false;
		} else if (numSold <= 0) {
			alert('cannot sell non-positive stocks!');
			return false;
		} else {
			return true;
		}
	}

	function doPurchase(price: any, numStocks: number) {
		const totalPrice = parseFloat(price) * numStocks;
		if (portfolio.balance >= totalPrice && numStocks > 0) {
			return true;
		} else if (numStocks <= 0) {
			alert('cannot buy non-positive stocks!');
			return false;
		} else {
			alert('Insuficient Funds.');
			return false;
		}
	}

	return (
		<>
			{!submitted ? (
				<div className="sellContainer">
					<p className="sharePrompt">
						Enter shares to {props.type}:{' '}
						<input
							type="number"
							className="toSellInput"
							min="0"
							value={quantity}
							onChange={(e) => setQuantity(+e.target.value)}></input>
					</p>
					<p className="totalEst">
						Estimated Total: <p className="estValue">${displayTotal}</p>
					</p>
					<div className="confirmContain">
						<Checkbox onChange={() => setConfirmed(!confirmed)} />
						<p className="confirmText">Confirm</p>
					</div>
					<button
						onClick={() => handleSubmit()}
						className="doSell"
						disabled={!confirmed || !hasPrice}>
						{props.type === 'buy' ? 'Buy' : 'Sell'}
					</button>
				</div>
			) : !completed ? (
				<div>
					<p>Performing transaction...</p>
				</div>
			) : (
				<div>
					<TransactionCompletePop
						buy={props.type === 'buy' ? 1 : 0}
						numStock={quantity}
						stockPrice={price}
						stockSymbol={props.item?.symbol}
					/>
				</div>
			)}
		</>
	);
}

export default withUserProfileLoader(BuySellPopup);
