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

/**
 * This is the Add Watchlist Pop Up Code
 * When clicking the '+' button next to 'My Watchlists' on the side menu in dashboard, 
 * this will pop up Entering the watchlist name, and clicking confirm and then 'Create' 
 * will create the new watchlist for the user's current porfolio.
 * ***/

function AddWatchListPop(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const [confirm, setConfirm] = useState(0);
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="buySellPopUp">
			<div className="sellContainer">
				<p className="watchNamePrompt">
					Name of Watchlist: <input className="toSellInput"></input>
				</p>
				<div className="confirmContain">
					<Checkbox onChange={() => (confirm === 0 ? setConfirm(1) : setConfirm(0))} />
					<p className="confirmText">Confirm</p>
				</div>
				<button className="doBuy">Create</button>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddWatchListPop);
