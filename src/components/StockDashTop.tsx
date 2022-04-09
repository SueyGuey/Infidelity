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

/**This is the Stock Dashboard's top component. It displays the Stock Graph and
 * holds the search component so the user can resume searching through stocks. 
 */

function StockDashTop(
	props: WithUserProfileLoaderProps & WithMarketLoaderProps & { symbol: string }
): ReactElement {
	const stock = props.marketData.find((stock) => stock.symbol === props.symbol);
	//Displays placeholder text if stock is not found
	const price = stock ? stock.currentPrice.value.toFixed(2) : '###.##';
	const [popUpState, setPopUpState] = useState(-1); //handles state of pop up

	//this function displays (or not) pop up. Specifically the 'add stock to watchlist' pop up
	const popUpHandler = function popUpHandler(props: any) {
		if (props === -1) {
			return <div></div>;
		} else {
			return (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setPopUpState(-1)}>
						X
					</button>
					<AddToWatchList />
				</div>
			);
		}
	};
	return (
		<div>
			{popUpHandler(popUpState)} {/* The pop up */}
			<div className="DashTopContain">
				<div className="stockValueContainer">
					<div className="stockGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">
								<button
									onClick={() => setPopUpState(0)}
									className="addToWatchlistButton">
									+W
								</button> {/*clicking the button displays the pop up.*/}
								{props.symbol}: <p className="stockValue">${price}</p>
								{/* Displays stock ticker and current price */}
							</p>
							<StockGraph symbol={props.symbol} />
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
