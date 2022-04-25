import React, { ReactElement, useState } from 'react';
import '../css/DashTop.css';
import '../css/home.css';
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import AddToWatchList from './AddToWatchList';
import { Tradeable } from '../datamodels/Portfolio';
import { ChangingNumber } from '../datamodels/misc';

type StockDashTopProps = {
	item: Tradeable;
	price?: ChangingNumber;
} & WithUserProfileLoaderProps &
	WithMarketLoaderProps;

/**
 * This is the Stock Dashboard's top component. It displays the Stock Graph and
 * holds the search component so the user can resume searching through stocks.
 */
function StockDashTop(props: StockDashTopProps): ReactElement {
	const displayPrice = props.item.currentPrice
		? props.item.currentPrice.value.toFixed(2)
		: '##.##';

	// handles state of pop up for adding stock to watchlist
	const [showAddToWatchlist, setShowAddToWatchlist] = useState(false);

	return (
		<div>
			{showAddToWatchlist && (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setShowAddToWatchlist(false)}>
						X
					</button>
					<AddToWatchList item={props.item.symbol} />
				</div>
			)}
			<div className="DashTopContain">
				<div className="stockValueContainer">
					<div className="stockGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">
								{/*clicking the button displays the pop up.*/}
								<button
									onClick={() => setShowAddToWatchlist(true)}
									className="addToWatchlistButton">
									+W
								</button>{' '}
								{/* Displays stock ticker and current price */}
								{props.item.symbol}: <p className="stockValue">${displayPrice}</p>
							</p>
							<StockGraph symbol={props.item.symbol} />
							{/* Displays graph of stock. */}
						</div>
					</div>
				</div>
				<div className="searchSide">
					<Search />
					{/* Search Component, see SearchColumn.tsx */}
				</div>
			</div>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(StockDashTop));
