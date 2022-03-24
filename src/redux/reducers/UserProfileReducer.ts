/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from 'redux';
import User from '../../datamodels/User';
import { Action } from '../actions/types';
import Loadable from '../redux-config/loadable';

export interface UserProfileState {
	userProfile: Loadable<User>;
}

const DEFAULT_STATE: UserProfileState = {
	userProfile: { status: 'loading' },
};

export default (
	state = DEFAULT_STATE,
	action: AnyAction
): UserProfileState | { state: UserProfileState; userProfile: UserProfileState } => {
	switch (action.type) {
		case Action.FETCH_USER_PROFILE:
			return { ...state, userProfile: action.payload };
		case Action.UPDATE_USER_PROFILE:
			return { ...state, userProfile: action.payload };
		default:
			return state;
	}
};
