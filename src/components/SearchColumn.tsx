import React, { ReactElement, useEffect, useState } from 'react';
import '../css/Search.css';
import { isStock, Stock } from '../datamodels/Portfolio';
import searchIcon from '../images/searchIcon.png';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';
import { useNavigate } from 'react-router-dom';
import { searchMarketBackend } from '../endpoints';
import { is } from 'immer/dist/internal';
import SearchResults from './SearchResults';

/**
 * This is the Search component. It is contained within the outer div given by the parent page.
 * The search component searches through available stocks given the user query and displays the
 * relevant results, ommitting non-matches. Users can select the result to go to the corresponding
 * stock page
 * */
function Search(): ReactElement {
	const [query, setQuery] = useState(''); //handles user query input for live search updating.
	return (
		<div className="searchContainer">
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
			<SearchResults query={query}></SearchResults>
		</div>
	);
}

export default Search;
