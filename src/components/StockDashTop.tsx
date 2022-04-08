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

function StockDashTop(
	props: WithUserProfileLoaderProps & WithMarketLoaderProps & { symbol: string }
): ReactElement {
	const stock = props.marketData.find((stock) => stock.symbol === props.symbol);
	//Displays placeholder text if stock is not found
	const price = stock ? stock.currentPrice.value.toFixed(2) : '###.##';
	const [popUpState, setPopUpState] = useState(-1);
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
			{popUpHandler(popUpState)}
			<div className="DashTopContain">
				<div className="stockValueContainer">
					<div className="stockGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">
								<button
									onClick={() => setPopUpState(0)}
									className="addToWatchlistButton">
									+W
								</button>
								{props.symbol}: <p className="stockValue">${price}</p>
							</p>
							<StockGraph symbol={props.symbol} />
						</div>
					</div>
				</div>
				<div className="searchSide">
					<Search />
				</div>
			</div>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(StockDashTop));
