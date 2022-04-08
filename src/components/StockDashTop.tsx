import React, { ReactElement } from 'react';
import '../css/DashTop.css';
import '../css/home.css';
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';

function StockDashTop(
	props: WithUserProfileLoaderProps & WithMarketLoaderProps & { symbol: string }
): ReactElement {
	const stock = props.marketData.find((stock) => stock.symbol === props.symbol);
	//Displays placeholder text if stock is not found
	const price = stock ? stock.currentPrice.value.toFixed(2) : '###.##';
	return (
		<div className="DashTopContain">
			<div className="stockValueContainer">
				<div className="stockGraph">
					<div className="graph" id="graph-container">
						<p className="portfolioName">
							<button className = "addToWatchlistButton">+W</button>{props.symbol}: <p className="stockValue">${price}</p>
						</p>
						<StockGraph symbol={props.symbol} />
					</div>
				</div>
			</div>
			<div className="searchSide">
				<Search />
			</div>
		</div>
	);
}

export default withMarketLoader(withUserProfileLoader(StockDashTop));
