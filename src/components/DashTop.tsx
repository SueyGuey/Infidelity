import React, { ReactElement, useState } from 'react';
import '../css/DashTop.css';
import '../css/home.css';
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import AddPortfolioPop from './AddPortfolioPop';

function DashTop(props: WithUserProfileLoaderProps): ReactElement {
	const portfolios = Array.from(props.userProfile.portfolios);
	const [selectedPortfolio, setPortfolio] = React.useState(portfolios[0]);
	const portfolioValue = 10000;
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
					<AddPortfolioPop />
				</div>
			);
		}
	};

	return (
		<div>
			{popUpHandler(popUpState)}
			<div className="DashTopContain">
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
				<div className="portfolioValueContainer">
					<span className="tradeValues">
						Total Value<p className="worthValue">${portfolioValue}</p>
					</span>
					<span className="tradeValues">
						Stock Value<p className="worthValue">$###.##</p>
					</span>
					<span className="tradeValues">
						Options Value<p className="worthValue">$###.##</p>
					</span>
					<span className="tradeValues">
						Crpyto Value<p className="worthValue">$###.##</p>
					</span>
					<div className="portfolioGraph">
						<div className="graph" id="graph-container">
							<p className="portfolioName">Porfolio Value</p>
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
