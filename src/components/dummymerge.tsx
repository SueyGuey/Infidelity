import React, { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { PriceChange } from '@mui/icons-material';
import TransactionCompletePop from './TransactionCompletePop';
// import { changeByQuantity } from '../datamodels/Portfolio';

/**
 * This is the Buy-Sell pop up file. This file is what constructs either a buy or sell
 * version of the BuySellPopUp depending on which button is clicked on the stock page.
 * This, when hooked up to the backend, will provide the shares to buy or sell to the backend
 * if the user has made a valid sale or purchase of that stock.
 * */

type BuySellProps = {
	buy: any;
	symbol: string;
} & WithUserProfileLoaderProps &
	WithMarketLoaderProps;

function BuySellPopup(props: BuySellProps): ReactElement {
	const portfolio = Array.from(props.userProfile.portfolios)[0];
	const asset = Array.from(portfolio.assets).find((asset) => asset.itemSymbol === props.symbol);
	const quantity = asset ? asset.quantity : 0;

	/*IMPORTANT TO REMOVE AFTER BACKEND COMMUNICATION IS COMPLETE*/
	const portfolioValue = 10000; //PLACEHOLDER VALUE
	/************************************************************/

	const stock = props.marketData.find((stock) => stock.symbol === props.symbol);
	//Displays placeholder text if stock is not found
	const price = stock ? stock.currentPrice.value.toFixed(2) : '###.##';
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const { _active } = useParams();
	const [confirm, setConfirm] = useState(0);
	const [numStocks, setNumStocks] = useState(0);
	const [completedTransaction, setTransactionComplete] = useState(-1);

	/*The function that swaps what is displayed. 0 is sell, 1 is buy.*/
	const { item } = useParams();
	const { numStock } = useParams();
	const { stockPrice } = useParams();
	const { stockSymbol } = useParams();
	const [childState, setChildState] = useState();

	const onChangeChild = (e: { target: { value: React.SetStateAction<undefined> } }) =>
		setChildState(e.target.value);
	const buyOrSell = function buyOrSell(isBuy: number) {
		if (completedTransaction === 0 && isBuy === 0) {
			return (
				<TransactionCompletePop
					buy={item || 0}
					numStock={numStock || numStocks}
					stockPrice={stockPrice || price}
					stockSymbol={stockSymbol || stock?.symbol}
				/>
			);
		} else if (completedTransaction === 1 && isBuy === 1) {
			return (
				<TransactionCompletePop
					buy={item || 1}
					numStock={numStock || numStocks}
					stockPrice={stockPrice || price}
					stockSymbol={stockSymbol || stock?.symbol}
				/>
			);
		} else if (isBuy === 0) {
			return (
				<div className="sellContainer">
					<p className="sharePrompt">
						Enter Shares to Sell:
						<input
							className="toSellInput"
							type="number"
							placeholder="0"
							min="0.01"
							step="0.01"
							onChange={(e) => setNumStocks(parseFloat(e.target.value))}></input>
					</p>
					<p className="totalEst">
						Estimated Total:
						<p className="estValue">
							${parseFloat(price) * parseFloat(numStocks.toFixed(2))}
						</p>
					</p>
					<div className="confirmContain">
						<Checkbox
							onChange={() => (confirm === 0 ? setConfirm(1) : setConfirm(0))}
						/>
						<p className="confirmText">Confirm</p>
					</div>
					<button
						onClick={() => doSale(confirm, price, numStocks, quantity)}
						className="doSell">
						Sell
					</button>
				</div>
			);
		} else if (isBuy === 1) {
			return (
				<div className="sellContainer">
					<p className="sharePrompt">
						Enter Shares to Buy:
						<input
							className="toSellInput"
							type="number"
							placeholder="0"
							min="0.01"
							step="0.01"
							onChange={(e) => setNumStocks(parseInt(e.target.value))}></input>
					</p>
					<p className="totalEst">
						Estimated Total:{' '}
						<p className="estValue">
							${parseFloat(price) * parseFloat(numStocks.toFixed(2))}{' '}
							{/* Fractional stock doesn't work for Buy for some reason, works for sell */}
						</p>
					</p>
					<div className="confirmContain">
						<Checkbox
							onChange={() => (confirm === 0 ? setConfirm(1) : setConfirm(0))}
						/>
						<p className="confirmText">Confirm</p>
					</div>
					<button
						onClick={() => doPurchase(confirm, price, numStocks, quantity)}
						className="doBuy">
						Buy
					</button>
				</div>
			);
		}
	};

	const doSale = function doSale(
		confirm: any,
		price: any,
		numStocks: number,
		totalOwned: number
	) {
		const totalPrice = parseFloat(price) * numStocks;
		const numSold = numStocks;
		if (confirm === 1) {
			//if you have the stock you're trying to sell, you can sell.
			if (numSold > totalOwned) {
				alert('cannot do sale. Insufficient Quantity');
			} else {
				if (asset) {
					// changeByQuantity(asset, -numStocks);
				}
				setTransactionComplete(0);
			}
		} else {
			alert('did not confirm');
		}
	};

	const doPurchase = function doPurchase(
		confirm: any,
		price: any,
		numStocks: number,
		totalOwned: number
	) {
		const totalPrice = parseFloat(price) * numStocks;
		if (confirm === 1) {
			if (portfolioValue >= totalPrice) {
				if (asset) {
					// changeByQuantity(asset, numStocks);
				}
				setTransactionComplete(1);
			} else {
				alert('Insuficient Funds.');
			}
		} else {
			alert('did not confirm');
		}
	};

	//returns the proper pop up
	return user ? <div className="buySellPopUp">{buyOrSell(props.buy)}</div> : <Navigate to="/" />;
}

export default withMarketLoader(withUserProfileLoader(BuySellPopup));