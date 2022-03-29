/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from 'redux';
import { Action } from '../actions/types';
import Loadable from '../redux-config/loadable';

export interface MarketState {
	marketData: Loadable<any>;
}

const DEFAULT_STATE: MarketState = {
	marketData: { status: 'loading' },
};

export default (
	state = DEFAULT_STATE,
	action: AnyAction
): MarketState | { state: MarketState; marketData: MarketState } => {
	switch (action.type) {
		case Action.FETCH_TRADEABLE:
			return { ...state, marketData: action.payload };
		case Action.SEARCH_MARKET:
			return { ...state, marketData: action.payload };
		default:
			return state;
	}
};