import { Dispatch } from 'react';
import { FetchError, JSONData } from '../../datamodels/misc';
import User, { dataToUser, userToData } from '../../datamodels/User';
import { EDIT_USER_URL, getTradeableBackend, GET_USER_URL, searchMarketBackend } from '../../endpoints';
import authFetchWrapper from '../authFetch';
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