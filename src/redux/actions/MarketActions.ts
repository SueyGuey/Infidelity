/**
 * MarketActions.ts
 * Contains all the actions that can be performed components that use withMarketLoader
 */

import { Dispatch } from 'react';
import { FetchError } from '../../datamodels/misc';
import { Tradeable, TransactionRequest } from '../../datamodels/Portfolio';
import { getTradeableBackend, makeTradeBackend, searchMarketBackend } from '../../endpoints';
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
		// fetch(SEARCH_MARKET_URL('AAPL'))
		// 	.then(async (response: Response) => {
		// 		const data: Tradeable[] | FetchError = await response.json();
		// 		if ('error' in data) {
		// 			dispatch({
		// 				type: Action.FETCH_MARKET_DATA,
		// 				payload: { status: 'error', errorMessage: data.error },
		// 			});
		// 		} else {
		// 			console.log(data);
		// 			dispatch({
		// 				type: Action.FETCH_MARKET_DATA,
		// 				payload: { status: 'success', data: data },
		// 			});
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
		const data: Tradeable[] = mock_stock_data;
		dispatch({
			type: Action.FETCH_MARKET_DATA,
			payload: { status: 'success', data: data },
		});
	};
};

//Getting a particular tradeable item from the market
export const fetchTradeable = (symbol: string) => {
	return async (
		dispatch: Dispatch<{
			type: Action;
			payload: Loadable<Tradeable>;
		}>
	) => {
		dispatch({ type: Action.FETCH_TRADEABLE, payload: { status: 'loading' } });
		getTradeableBackend(symbol)
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

//Searches the market based on input string query
export const searchMarket = (query: string) => {
	return async (dispatch: Dispatch<MarketDataAction>) => {
		dispatch({ type: Action.SEARCH_MARKET, payload: { status: 'loading' } });
		searchMarketBackend(query)
			.then(async (response: Response) => {
				const data: any = await response.json();
				// first check if data has returned an error
				if ('error' in data) {
					dispatch({
						type: Action.SEARCH_MARKET,
						payload: { status: 'error', errorMessage: data.error },
					});
				} else {
					console.log('SEARCH RESULTS ', data);
					dispatch({
						type: Action.SEARCH_MARKET,
						payload: { status: 'success', data: data },
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
