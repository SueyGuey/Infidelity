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
		console.log('submitting transaction request');
		setSubmitted(true);
		makeTradeBackend({
			username: props.userProfile.username,
			itemSymbol: props.item.symbol,
			portfolioName: portfolio.name,
			quantity: props.type === 'buy' ? quantity : -quantity,
			timestamp: new Date().getMilliseconds(),
		}).then((res) => {
			console.log('trade result: ', res);
			setCompleted(true);
		});
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
					<p>Congrats! The transaction is complete.</p>
				</div>
			)}
		</>
	);
}

export default withUserProfileLoader(BuySellPopup);
