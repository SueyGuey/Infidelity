import React, { ReactElement, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import userPool from '../authentication/userPool';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import '../css/Dashboard.css';
import '../css/BuySellPopUp.css';
import { Checkbox } from '@mui/material';
import { addToWatchlist } from '../endpoints';
import { Tradeable } from '../datamodels/Portfolio';

/**
 * This is the Add To Watchlist Pop Up Code
 * When clicking the '+W' button next to a Stock Ticker on the stock graph
 * this will pop up Entering selecting watchlists to add the stock to and
 * clicking Add will add the stock to the selected watchlist(s)
 * ***/

type addWatchlistProps = {
	item: string;
} & WithUserProfileLoaderProps;

function AddToWatchList(props: addWatchlistProps): ReactElement {
	console.log(props.userProfile);
	const user = userPool.getCurrentUser();
	const [submitted, setSubmitted] = useState(false);
	const [WL, setWL] = useState(['']);
	const watchlists = Array.from(props.userProfile.watchlists);

	function handleChange(e: any) {
		const value = Array.from(e.target.selectedOptions, (option: any) => option.value);
		setWL(value);
	}

	function handleSubmit() {
		console.log('Adding a new watchlist: ', WL);
		addToWatchlist({
			username: props.userProfile.username,
			symbol: props.item,
			watchlistNames: WL,
		});
		setSubmitted(true);
	}

	return user ? (
		!submitted ? (
			<div className="buySellPopUp">
				<div className="sellContainer">
					<p className="watchNamePrompt">
						Add To Watchlist:
						<select
							className="watchSelect"
							multiple={true}
							onChange={(e) => handleChange(e)}>
							{watchlists.map((watchlist) => (
								<option value={watchlist.name} key={watchlist.watchlistId}>
									{watchlist.name}
								</option>
							))}
						</select>
					</p>
					<p className="selectWatchTxt">(Hold ctrl to add to multiple watchlists)</p>
					<button className="watchAdj" onClick={() => handleSubmit()}>
						Add
					</button>
				</div>
			</div>
		) : (
			<div>
				<p>Stock added to watchlist</p>
				<button onClick={() => location.reload()} className="doClose">
					Continue
				</button>
			</div>
		)
	) : (
		<Navigate to="/" />
	);
}

export default withUserProfileLoader(AddToWatchList);
