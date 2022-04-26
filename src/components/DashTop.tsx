import React, { ReactElement, useState } from 'react';
import '../css/DashTop.css';
import '../css/home.css';
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import AddPortfolioPop from './AddPortfolioPop';
import { getActivePortfolio } from '../datamodels/User';
import Portfolio, { getTotalStockValue } from '../datamodels/Portfolio';

type DashTopProps = WithUserProfileLoaderProps & { portfolio: Portfolio };

/**
 * This is the Top Portion of the user Dashboard. It contains the portfolio value graph,
 * portfolio value categories, trade sidebar and the active portfolio display drop menu.
 * You can find the add portfolio button next to the active portfolio display drop menu.
 */
function DashTop(props: DashTopProps): ReactElement {
	const portfolios = Array.from(props.userProfile.portfolios);
	const portfolioValue = props.portfolio.totalValue
		? props.portfolio.totalValue.value
		: props.portfolio.balance + 1.93;
	const stockValue = getTotalStockValue(props.portfolio);
	const optionsValue = 0;
	const cryptoValue = 0;

	const [popUpState, setPopUpState] = useState(-1); //handles pop up state for add new Porfolio pop up

	//this function handles the display of the portfolio add pop up if conditions are met.
	const popUpHandler = function popUpHandler(props: any) {
		if (props === -1) {
			return <div></div>;
		} else {
			return (
				<div className="popUpContainer">
					<button className="x-button" onClick={() => setPopUpState(-1)}>
						X
					</button>
					<AddPortfolioPop />
				</div>
			);
		}
	};

	return (
		<div>
			{popUpHandler(popUpState)}{' '}
			{/*Pop up is in outer div so it is able to display properly in screen*/}
			<div className="DashTopContain">
				{/* The active portfolio drop down menu, and the add portfolio button */}
				<div className="ActivePortfolio">
					<button onClick={() => setPopUpState(0)} className="newPortfolioButton">
						<p>+</p>
					</button>
					<p>Active Portfolio:</p>
					<select className="selectPortfolio">
						{portfolios.map((portfolio) => (
							<option value={portfolio.name} key={portfolio.portfolioId}>
								{portfolio.name}
							</option>
						))}
					</select>
				</div>
				{/*The 3 - 4 portfolio value summary rectangles, displaying numerical values of interest*/}
				<div className="portfolioValueContainer">
					<span className="tradeValues">
						Total Value<p className="worthValue">${portfolioValue.toFixed(2)}</p>
					</span>
					<span className="tradeValues">
						Stock Value<p className="worthValue">${stockValue.toFixed(2)}</p>
					</span>
					<span className="tradeValues">
						Options Value<p className="worthValue">${optionsValue.toFixed(2)}</p>
					</span>
					<span className="tradeValues">
						Crpyto Value<p className="worthValue">${cryptoValue.toFixed(2)}</p>
					</span>
					<span className="tradeValues">
						Balance<p className="worthValue">${props.portfolio.balance.toFixed(2)}</p>
					</span>

					{/* The porfolio value graph */}
					<div className="portfolioGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">Portfolio Value</p>
							<StockGraph symbol="MSFT" />
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

export default withUserProfileLoader(DashTop);
