/**
 * UserProfileActions.ts
 * Contains the actions performed on the user
 */

import { Dispatch } from 'react';
import { FetchError, JSONData } from '../../datamodels/misc';
import User, { jsonToUser, userToJson } from '../../datamodels/User';
import { EDIT_USER_URL, GET_USER_URL } from '../../endpoints';
import authFetchWrapper from '../authFetch';
import Loadable from '../redux-config/loadable';
import { Action } from './types';
import mock_user from '../../mock_data/user.json';

type UserProfileAction = {
	type: Action;
	payload: Loadable<User>;
};

//Gets the user profile, handles errors
export const fetchUserProfile = (username: string) => {
	return async (dispatch: Dispatch<UserProfileAction>) => {
		const fetchUserProfileCallback = async (bearerToken: string) => {
			if (bearerToken === 'Refresh Token has expired') {
				dispatch({
					type: Action.FETCH_USER_PROFILE,
					payload: { status: 'error', errorMessage: bearerToken },
				});
				return;
			}
			dispatch({ type: Action.FETCH_USER_PROFILE, payload: { status: 'loading' } });
			try {
				fetch(GET_USER_URL(username), {
					headers: {
						Authorization: `Bearer ${bearerToken}`,
						'Content-Type': 'application/json',
					},
				})
					.then(async (response: Response) => {
						const data: JSONData<User> | FetchError = await response.json();
						// const data: JSONData<User> | FetchError = mock_user;
						// first check if data has returned an error
						if ('error' in data) {
							dispatch({
								type: Action.FETCH_USER_PROFILE,
								payload: { status: 'error', errorMessage: data.error },
							});
						} else {
							const user = jsonToUser(data as JSONData<User>);
							dispatch({
								type: Action.FETCH_USER_PROFILE,
								payload: { status: 'success', data: user },
							});
						}
					})
					.catch((error) => {
						console.error(error);
					});
			} catch (error) {
				console.error(error);
				dispatch({
					type: Action.FETCH_USER_PROFILE,
					payload: { status: 'error', errorMessage: (error as Error).message },
				});
			}
		};
		try {
			authFetchWrapper(fetchUserProfileCallback);
		} catch (error) {
			console.error(error);
			dispatch({
				type: Action.FETCH_USER_PROFILE,
				payload: { status: 'error', errorMessage: (error as Error).message },
			});
		}
	};
};

//updates the user's profiles
export const updateUserProfile = (newData: User) => {
	return async (dispatch: Dispatch<UserProfileAction>) => {
		const updateUserProfileCallback = async (bearerToken: string) => {
			dispatch({
				type: Action.UPDATE_USER_PROFILE,
				payload: { status: 'success', data: newData as User },
			});
			try {
				const userJSON = userToJson(newData);
				const _result = await (
					await fetch(EDIT_USER_URL, {
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${bearerToken}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(userJSON),
					})
				).json();
			} catch (error) {
				console.error(error);
				dispatch({
					type: Action.UPDATE_USER_PROFILE,
					payload: { status: 'error', errorMessage: (error as Error).message },
				});
			}
		};
		authFetchWrapper(updateUserProfileCallback);
	};
};
