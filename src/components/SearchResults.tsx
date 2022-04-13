import React, { ReactElement, useState } from 'react';
import '../css/Search.css';
import { isStock } from '../datamodels/Portfolio';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { useNavigate } from 'react-router-dom';

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
						// navigates to the corresponding stock page when the result is clicked
						navigate(`/stockDash/${item.symbol}`);
						// refresh the page to update the stock data
						window.location.reload();
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
