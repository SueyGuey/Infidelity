import React, { ReactElement } from 'react';
import '../css/DashTop.css'
import '../css/home.css'
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';

function DashTop(props: WithUserProfileLoaderProps): ReactElement {
	const portfolios = Array.from(props.userProfile.portfolios);
	const [selectedPortfolio, setPortfolio] = React.useState(portfolios[0]);
	const portfolioValue = 10000;
	return(
		<div className = "DashTopContain">
			<div className = "ActivePortfolio">
				<p>Active Portfolio:</p>
				<select className = "selectPortfolio">
					{portfolios.map((portfolio) =>
						<option
							value={portfolio.name}
							key={portfolio.portfolioId}>
							{portfolio.name}
						</option>
					)}
				</select>
			</div>
			<div className = "portfolioValueContainer">
				<span className = "tradeValues">Total Value<p className = "worthValue">${portfolioValue}</p></span>
				<span className = "tradeValues">Stock Value<p className = "worthValue">$###.##</p></span>
				<span className = "tradeValues">Options Value<p className = "worthValue">$###.##</p></span>
				<span className = "tradeValues">Crpyto Value<p className = "worthValue">$###.##</p></span>
				<div className = "portfolioGraph">
					<div className='graph' id='graph-container'>
						<p className='portfolioName'>Porfolio Value</p>
						<StockGraph/>
					</div>
				</div>
			</div>
			<div className = "searchSide">
				<Search/>
			</div>
		</div>
	);
}

export default withUserProfileLoader(DashTop);