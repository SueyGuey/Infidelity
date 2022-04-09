/**
 * withUserProfileLoader.tsx
 * Higher order component which wraps the component with a loading spinner.
 * This is used to load the user profile data from the backend.
 * The relevant data is passed to the wrapped component as props.
 */

import { useEffect } from 'react';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../redux-config/hooks';
import { UserProfileState } from '../reducers/UserProfileReducer';
import { fetchUserProfile, updateUserProfile } from '../actions/UserProfileActions';
import Loadable from '../redux-config/loadable';
import User from '../../datamodels/User';
import userPool from '../../authentication/userPool';
import LoadingAnimation from './loading';
import ErrorPage from '../../components/errorPage';
import { useNavigate } from 'react-router-dom';

//Fetches the user
export interface WithUserProfileLoaderProps {
	userProfile: User;
	updateUser: (newData: User) => void;
}

export default function withUserProfileLoader<PropType>(
	ReactComponent: React.ComponentType<PropType & WithUserProfileLoaderProps>
): React.FC<PropType> {
	return function ComponentWithUserProfile(props: PropType): JSX.Element {
		const dispatch = useAppDispatch();
		const navigate = useNavigate();

		const userProfile: Loadable<User> = useAppSelector<UserProfileState>(
			(state: any) => state.userProfile
		).userProfile;

		useEffect(() => {
			if (!userProfile.data) {
				const cognitoUser = userPool.getCurrentUser();
				if (cognitoUser) {
					dispatch(fetchUserProfile(cognitoUser.getUsername()));
				}
			}
		}, [dispatch]);

		function updateData(newData: User) {
			dispatch(updateUserProfile(newData));
		}

		switch (userProfile.status) {
			case 'loading':
				return <LoadingAnimation />;
			case 'error':
				if (userProfile.errorMessage === 'Refresh Token has expired') {
					const cognitoUser = userPool.getCurrentUser();
					if (cognitoUser) {
						cognitoUser.signOut();
					}
					navigate('/');
				}
				return <ErrorPage message={userProfile.errorMessage} />;
			case 'success':
				return (
					<ReactComponent
						userProfile={userProfile.data as User}
						updateUser={updateData}
						{...props}
					/>
				);
			default:
				return <></>;
		}
	};
}
