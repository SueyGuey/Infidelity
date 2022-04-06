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

function AddPortfolioPop(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	return user ? (
		<div className="buySellPopUp">
			<div>
				<button className="x">X</button>
			</div>
			<div className="sellContainer">
				<p className="portNamePrompt">
					Name of Portfolio: <input className="toSellInput"></input>
				</p>
				<p className="balanceStartPrompt">
					Enter Initial Balance: <input className="toSellInput"></input>
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

export default withUserProfileLoader(AddPortfolioPop);
