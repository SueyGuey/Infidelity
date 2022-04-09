import React, { ReactElement } from 'react';
import '../css/Search.css';
import { Stock } from '../datamodels/Portfolio';
import searchIcon from '../images/searchIcon.png';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { useNavigate } from 'react-router-dom';

/**
 * This is the Search component. It is contained within the outer div given by the parent page.
 * The search component searches through available stocks given the user query and displays the
 * relevant results, ommitting non-matches. Users can select the result to go to the corresponding
 * stock page
 * */
function Search(props: WithMarketLoaderProps): ReactElement {
	const data = props.marketData as Stock[];
	const [query, setQuery] = React.useState(''); //handles user query input for live search updating.
	const results = data.filter((item) => {
		return item.symbol.toLowerCase().includes(query.toLowerCase());
	}); //handles the filtering of results from the user query.

	const navigate = useNavigate();
	return (
		<div className="searchContainer">
			{' '}
			{/* the main search container */}
			<div className="searchBar">
				<input
					className="searchInput"
					type="text"
					placeholder="search..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}></input>
				<img className="searchIcon" src={searchIcon} />
			</div>
			{/* The top search bar, contains the inputfield */}
			{/* The search results, contains the formatted search reuslts for the user to see */}
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
						<p className="searchResultName">{item.company.name}</p>
						<p className="searchResultPrice">{item.currentPrice.value.toFixed(4)}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default withMarketLoader(Search);
