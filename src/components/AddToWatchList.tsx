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

function AddToWatchlist(props: WithUserProfileLoaderProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const watchlists = Array.from(props.userProfile.watchlists);
	return user ? (
		<div className="buySellPopUp">
			<div className="sellContainer">
				<p className="watchNamePrompt">
					Add To Watchlist:
					<select className="watchSelect" multiple>
						{watchlists.map((watchlist) => (
							<option value={watchlist.name} key={watchlist.watchlistId}>
								{watchlist.name}
							</option>
						))}
					</select>
				</p>
				<p className="selectWatchTxt">(Hold ctrl to add to multiple watchlists)</p>
				<button className="watchAdj">Add</button>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddToWatchlist);
