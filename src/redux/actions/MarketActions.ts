import { Dispatch } from 'react';
import User from '../../datamodels/User';
import { getTradeableBackend, searchMarketBackend } from '../../endpoints';
import Loadable from '../redux-config/loadable';
import { Action } from './types';

type MarketAction = {
	type: Action;
	payload: Loadable<User>;
};

export const fetchTradeable = (symbol: string) => {
	return async (dispatch: Dispatch<MarketAction>) => {
		dispatch({ type: Action.FETCH_TRADEABLE, payload: { status: 'loading' } });
		getTradeableBackend(symbol)
			.then(async (response: Response) => {
				const data: any = await response.json();
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
	return async (dispatch: Dispatch<MarketAction>) => {
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