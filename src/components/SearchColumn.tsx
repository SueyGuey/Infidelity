import React, { ReactElement } from 'react';
import '../css/Search.css'
import { Stock } from '../datamodels/Portfolio';
import searchIcon from '../images/searchIcon.png';
import withMarketLoader, { WithMarketLoaderProps } from '../redux/loaders/withMarketLoader';

function Search(props: WithMarketLoaderProps): ReactElement {
    const data = props.marketData as Stock[];
    const [query, setQuery] = React.useState('');
    const results = data.filter((item) => {
        return item.symbol.toLowerCase().includes(query.toLowerCase());
    });
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
            <div className = "searchResults">
                {results.map((item) =>
                    <div className = "searchResult"
                        key={item.symbol}>
                        <p className = "searchResultSymbol">{item.symbol}</p>
                        <p className = "searchResultName">{item.company.name}</p>
                        <p className = "searchResultPrice">{item.currentPrice.value}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default withMarketLoader(Search);