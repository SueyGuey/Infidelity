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
import { Tradeable } from '../datamodels/Portfolio';
import { OptionUnstyled } from '@mui/base';

/**
 * This is the Add To Watchlist Pop Up Code
 * When clicking the '+W' button next to a Stock Ticker on the stock graph
 * this will pop up Entering selecting watchlists to add the stock to and
 * clicking Add will add the stock to the selected watchlist(s)
 * ***/
type addWatchlistProps = {
	item: Tradeable;
} & WithUserProfileLoaderProps;

function AddToWatchList(props: addWatchlistProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const watchlists = Array.from(props.userProfile.watchlists);
	const [selectedOptions, setSelected] = useState(watchlists[0]);

	function handleChange(props: any) {
		const watchlist = Array.from(watchlists).find((watchlist) => watchlist.name === props);
		if (watchlist) {
			setSelected(watchlist);
		}
	}

	function doAddToWatchlist(stock: Tradeable) {
		//alert(selectedOptions.name);
		
	}

	return user ? (
		<div className="buySellPopUp">
			<div className="sellContainer">
				<p className="watchNamePrompt">
					Add To Watchlist:
					<select className="watchSelect" onChange={(e) => handleChange(e.target.value)}>
						{watchlists.map((watchlist) => (
							<option value={watchlist.name} key={watchlist.watchlistId}>
								{watchlist.name}
							</option>
						))}
					</select>
				</p>
				<p className="selectWatchTxt">(Hold ctrl to add to multiple watchlists)</p>
				<button className="watchAdj" onClick={() => doAddToWatchlist(props.item)}>
					Add
				</button>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddToWatchList);
