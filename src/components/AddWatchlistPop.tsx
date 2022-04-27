import React, { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';
import { newWatchlist } from '../endpoints';

/**
 * This is the Add Watchlist Pop Up Code
 * When clicking the '+' button next to 'My Watchlists' on the side menu in dashboard,
 * this will pop up Entering the watchlist name, and clicking confirm and then 'Create'
 * will create the new watchlist for the user's current porfolio.
 * ***/

function AddWatchListPop(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const [confirm, setConfirm] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [name, setName] = useState('');
	const user = userPool.getCurrentUser();

	function handleSubmit() {
		console.log('Adding a new watchlist: ', name);
		setSubmitted(true);
		newWatchlist({
			username: props.userProfile.username,
			watchlistName: name,
		});
	}

	return user ? (
		!submitted ? (
			<div className="buySellPopUp">
				<div className="sellContainer">
					<p className="watchNamePrompt">
						Name of Watchlist:
						<input
							className="toSellInput"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}></input>
					</p>
					<div className="confirmContain">
						<Checkbox
							onChange={() => (confirm === 0 ? setConfirm(1) : setConfirm(0))}
						/>
						<p className="confirmText">Confirm</p>
					</div>
					<button
						className="doBuy"
						onClick={() => handleSubmit()}
						disabled={!confirm || name === ''}>
						Create
					</button>
				</div>
			</div>
		) : (
			<div>
				<p>New watchlist has been added.</p>
				<button onClick={() => location.reload()} className="doClose">
					Continue
				</button>
			</div>
		)
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddWatchListPop);
