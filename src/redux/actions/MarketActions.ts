/**
 * MarketActions.ts
 * Contains all the actions that can be performed components that use withMarketLoader
 */

import { Dispatch } from 'react';
import { FetchError } from '../../datamodels/misc';
import { Tradeable, TransactionRequest } from '../../datamodels/Portfolio';
import {
	getTradeableBackend,
	GET_TRADEABLE_URL,
	makeTradeBackend,
	POPULAR_STOCKS_URL,
	searchMarketBackend,
	SEARCH_MARKET_URL,
} from '../../endpoints';
import Loadable from '../redux-config/loadable';
import { Action } from './types';
import mock_stock_data from '../../mock_data/stocks.json';

type MarketDataAction = {
	type: Action;
	payload: Loadable<Tradeable[]>;
};

//For getting data from the market
export const fetchMarketData = () => {
	return async (dispatch: Dispatch<MarketDataAction>) => {
		dispatch({ type: Action.FETCH_MARKET_DATA, payload: { status: 'loading' } });
		fetch(POPULAR_STOCKS_URL)
			.then(async (response: Response) => {
				const data: Tradeable[] | FetchError = await response.json();
				if ('error' in data) {
					dispatch({
						type: Action.FETCH_MARKET_DATA,
						payload: { status: 'error', errorMessage: data.error },
					});
				} else {
					console.log(data);
					dispatch({
						type: Action.FETCH_MARKET_DATA,
						payload: { status: 'success', data: data },
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
};

// Getting a particular tradeable item from the market that the user is viewing
export const fetchTradeable = (symbol: string) => {
	return async (
		dispatch: Dispatch<{
			type: Action;
			payload: Loadable<Tradeable>;
		}>
	) => {
		dispatch({ type: Action.FETCH_TRADEABLE, payload: { status: 'loading' } });
		fetch(GET_TRADEABLE_URL(symbol))
			.then(async (response: Response) => {
				const data: Tradeable | FetchError = await response.json();
				// first check if data has returned an error
				if ('error' in data) {
					dispatch({
						type: Action.FETCH_TRADEABLE,
						payload: { status: 'error', errorMessage: data.error },
					});
				} else {
					console.log(data);
					dispatch({
						type: Action.FETCH_TRADEABLE,
						payload: { status: 'success', data: data },
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
};

type SearchMarketAction = {
	type: Action;
	payload: {
		results: Loadable<Tradeable[]>;
		query: string;
	};
};

//Searches the market based on input string query
export const searchMarket = (query: string) => {
	return async (dispatch: Dispatch<SearchMarketAction>) => {
		dispatch({
			type: Action.SEARCH_MARKET,
			payload: { results: { status: 'loading' }, query: query },
		});
		fetch(SEARCH_MARKET_URL(query))
			.then(async (response: Response) => {
				console.log(response);
				const data: Tradeable[] | FetchError = await response.json();
				// first check if data has returned an error
				if ('error' in data) {
					dispatch({
						type: Action.SEARCH_MARKET,
						payload: {
							results: { status: 'error', errorMessage: data.error },
							query: query,
						},
					});
				} else {
					console.log('SEARCH RESULTS ', data);
					dispatch({
						type: Action.SEARCH_MARKET,
						payload: { results: { status: 'success', data: data }, query: query },
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
};

//Buy/sell tradeables
export const makeTrade = (trade: TransactionRequest) => {
	return async (dispatch: Dispatch<MarketDataAction>) => {
		dispatch({ type: Action.MAKE_TRADE, payload: { status: 'loading' } });
		makeTradeBackend(trade)
			.then(async (response: Response) => {
				const data: any = await response.json();
				// first check if data has returned an error
				if ('error' in data) {
					dispatch({
						type: Action.MAKE_TRADE,
						payload: { status: 'error', errorMessage: data.error },
					});
				} else {
					console.log('TRADE RESULTS ', data);
					dispatch({
						type: Action.MAKE_TRADE,
						payload: { status: 'success', data: data },
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
};
