/**
 * MarketReducer.ts
 * Fetching the market state
 */

import { AnyAction } from 'redux';
import { Tradeable } from '../../datamodels/Portfolio';
import { Action } from '../actions/types';
import Loadable from '../redux-config/loadable';

export interface MarketState {
	marketData: Loadable<Tradeable[]>;
	searchResults: Loadable<Tradeable[]>;
	searchQuery: string;
	viewing: Loadable<Tradeable | undefined>;
}

const DEFAULT_STATE: MarketState = {
	marketData: { status: 'loading' },
	searchResults: { status: 'success', data: [] },
	searchQuery: '',
	viewing: { status: 'success' },
};

export default (
	state = DEFAULT_STATE,
	action: AnyAction
): MarketState | { state: MarketState; marketData: MarketState } => {
	switch (action.type) {
		case Action.FETCH_TRADEABLE:
			return { ...state, viewing: action.payload };
		case Action.FETCH_MARKET_DATA:
			return { ...state, marketData: action.payload };
		case Action.SEARCH_MARKET:
			return {
				...state,
				searchResults: action.payload.results,
				searchQuery: action.payload.query,
			};
		default:
			return state;
	}
};
