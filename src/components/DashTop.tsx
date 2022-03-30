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

function DashTop(props: WithUserProfileLoaderProps): ReactElement {
	const portfolios = Array.from(props.userProfile.portfolios);
	const [selectedPortfolio, setPortfolio] = React.useState(portfolios[0]);
	return(
		<div className = "DashTopContain">
			<div className = "ActivePortfolio">
				<p>Active Portfolio: 
					<select className = "selectPortfolio">
						{portfolios.map((portfolio) =>
							<option value = {portfolio.name}>{portfolio.name}</option>
						)}
					</select>
					
				</p>
			</div>
			<div className = "portfolioValueContainer">
				<span className = "tradeValues"><p>Total Value<p className = "worthValue">$###.##</p></p></span>
				<span className = "tradeValues"><p>Stock Value<p className = "worthValue">$###.##</p></p></span>
				<span className = "tradeValues"><p>Options Value<p className = "worthValue">$###.##</p></p></span>
				<span className = "tradeValues"><p>Crpyto Value<p className = "worthValue">$###.##</p></p></span>
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