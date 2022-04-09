/**
 * authFetch.ts
 *
 */

import { CognitoUserSession } from 'amazon-cognito-identity-js';
import userPool from '../authentication/userPool';

const authFetchWrapper = async (callbackFetch: (bearerToken: string) => void) => {
	userPool.getCurrentUser()?.getSession((err?: any, session?: CognitoUserSession | null) => {
		if (err) {
			console.error(err);
			const code = err.code;
			if (code === 'NotAuthorizedException') {
				callbackFetch('Refresh Token has expired');
			} else {
				throw err;
			}
		} else if (session) {
			const userSession = session as CognitoUserSession;
			const accessToken = userSession.getAccessToken().getJwtToken();
			//const idToken = userSession.getIdToken().getJwtToken();
			callbackFetch(accessToken);
		}
	});
};

export default authFetchWrapper;
