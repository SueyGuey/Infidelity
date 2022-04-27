import React, { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';
import { newPortfolioBackend } from '../endpoints';

/**
 * This is the Add Portfolio Pop Up Code
 * When clicking the '+' button next to Active Portfolio, this will pop up
 * Entering the portfolio name, a positive float value and clicking confirm
 * will create the new portfolio for the user.
 * ***/

function AddPortfolioPop(props: WithUserProfileLoaderProps): ReactElement {
	const user = userPool.getCurrentUser();
	const [confirm, setConfirm] = useState(0); //the checkbox state, allows user input to go through or not
	const [submitted, setSubmitted] = useState(false);
	const [portfolioName, setPortfolioName] = useState(''); //for input text, portfolio name
	const [startingBal, setStartBalance] = useState(10000.0); //for input numbers , starting balance

	function createPortfolio(username: string, name: string, startingBal: number) {
		setSubmitted(true);
		newPortfolioBackend({
			username: username,
			portfolioName: name,
			accountBalance: startingBal,
		});
	}

	return user ? (
		!submitted ? (
			<div className="buySellPopUp">
				<div className="sellContainer">
					<p className="portNamePrompt">
						Name of Portfolio:
						<input
							className="toSellInput"
							type="text"
							onChange={(e) => setPortfolioName(e.target.value)}
							//on change sets name to current text
						/>
					</p>
					<p className="balanceStartPrompt">
						Enter Initial Balance:
						<input
							className="toSellInput"
							type="number"
							min="0.01" //minimum value is 0.01c
							onChange={(e) => setStartBalance(parseFloat(e.target.value))}
							//on change sets name to current numeral
						/>
					</p>
					<div className="confirmContain">
						<Checkbox
							onChange={() => (confirm === 0 ? setConfirm(1) : setConfirm(0))}
						/>
						{/* toggle check box */}
						<p className="confirmText">Confirm</p>
					</div>
					<button
						className="doBuy"
						onClick={() =>
							createPortfolio(props.userProfile.username, portfolioName, startingBal)
						}
						disabled={!confirm || portfolioName === ''}>
						Create
						{/* Create button, enters current information */}
					</button>
				</div>
			</div>
		) : (
			<div>
				<p>New portfolio has been added.</p>
				{location.reload()}
			</div>
		)
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddPortfolioPop);
