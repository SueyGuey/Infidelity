import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from '../authentication/userPool';
import DashSideMenu from './DashSideMenu';
import TopNavBar from './TopNavBar';
import '../css/DashTop.css'
import '../css/home.css'
import StockGraph from './StockGraph';
import Search from './SearchColumn';
import withUserProfileLoader, { WithUserProfileLoaderProps } from '../redux/loaders/withUserProfileLoader';

function StockDashTop(props: WithUserProfileLoaderProps & {symbol: string}): ReactElement {
	const portfolios = Array.from(props.userProfile.portfolios);
	const [selectedPortfolio, setPortfolio] = React.useState(portfolios[0]);
	const portfolioValue = 10000;
	return(
		<div className = "DashTopContain">
			<div className = "stockValueContainer">
				{/* <span className = "tradeValues">Total Value<p className = "worthValue">${portfolioValue}</p></span>
				<span className = "tradeValues">52 Week High<p className = "worthValue">$###.##</p></span>
				<span className = "tradeValues">52 Week Low<p className = "worthValue">$###.##</p></span>
				<span className = "tradeValues">Crpyto Value<p className = "worthValue">$###.##</p></span> */}
				<div className = "stockGraph">
					<div className='graph' id='graph-container'>
						<p className='portfolioName'>{props.symbol}: <p className = "stockValue">$###.##</p></p>
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

export default withUserProfileLoader(StockDashTop);