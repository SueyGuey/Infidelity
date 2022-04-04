import { Dispatch } from 'react';
import { FetchError } from '../../datamodels/misc';
import { Tradeable } from '../../datamodels/Portfolio';
import { getTradeableBackend, searchMarketBackend, SEARCH_MARKET_URL } from '../../endpoints';
import Loadable from '../redux-config/loadable';
import { Action } from './types';
import mock_stock_data from '../../mock_data/stocks.json';

type MarketDataAction = {
	type: Action;
	payload: Loadable<Tradeable[]>;
};

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
