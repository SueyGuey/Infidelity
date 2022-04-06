import React, { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';

function AddWatchListPop(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="buySellPopUp">
			<div>
				<button className="x">X</button>
			</div>
			<div className="sellContainer">
				<p className="watchNamePrompt">
					Name of Watchlist: <input className="toSellInput"></input>
				</p>
				<div className="confirmContain">
					<Checkbox />
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
