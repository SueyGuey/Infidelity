import React, { ReactElement } from 'react';
import '../css/Search.css'
import searchIcon from '../images/searchIcon.png';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';

function Search(props: WithMarketLoaderProps): ReactElement {
    const data = props.marketData;
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);
    return(
        <div className = "searchContainer">
            <div className = "searchBar">
                <input className = "searchInput"
                    type = "text"
                    placeholder='search...'
                    value = {query}
                    onChange = {(e) => setQuery(e.target.value)}></input>
                <img className = "searchIcon"src = {searchIcon}/>
            </div>
        </div>
    )
}

export default withMarketLoader(Search);