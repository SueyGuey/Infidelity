import React, { ReactElement, useEffect, useState } from 'react';
import '../css/Search.css';
import { isStock, Stock } from '../datamodels/Portfolio';
import searchIcon from '../images/searchIcon.png';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { useNavigate } from 'react-router-dom';
import { searchMarketBackend } from '../endpoints';
import { is } from 'immer/dist/internal';

type SearchResultsProps = {
	query: string;
} & WithMarketLoaderProps;

function SearchResults(props: SearchResultsProps): ReactElement {
	const [searched, setSearched] = useState(props.query); //handles state of search

	const dataSymbols = props.marketData.map((stock) => stock.symbol);
	const data = props.marketData.concat(
		props.searchResults.filter((stock) => !dataSymbols.includes(stock.symbol))
	);
	const results = data.filter((item) => {
		return item.symbol.toLowerCase().includes(props.query.toLowerCase());
	}); //handles the filtering of results from the user query.

	if (results.length <= 3 && props.query !== searched) {
		setSearched(props.query);
		props.searchMarket(props.query);
	}

	const navigate = useNavigate();
	return (
		<div className="searchResults">
			{results.map((item) => (
				<div
					className="searchResult"
					onClick={() => {
						navigate(`/stockDash/${item.symbol}`);
						//navigates to the corresponding stock page when the result is clicked
					}}
					key={item.symbol}>
					{/* The stock symbol, company name and current price for search display*/}
					<p className="searchResultSymbol">{item.symbol}</p>
					{isStock(item) && <p className="searchResultName">{item.company.name}</p>}
					<p className="searchResultPrice">
						{item.currentPrice ? item.currentPrice.value.toFixed(2) : '##.##'}
					</p>
				</div>
			))}
		</div>
	);
}

export default withMarketLoader(SearchResults);
