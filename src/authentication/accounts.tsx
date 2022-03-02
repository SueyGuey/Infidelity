import React, { ReactElement, createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './userPool';

type AccountContextType = {
	authenticate: any; // (Username: string, Password: string) => void;
	getSession: any;
	logout: any;
};

const AccountContext = createContext<AccountContextType>({
	authenticate: null,
	getSession: null,
	logout: null,
});

type AccountProps = {
	children: any;
};

const Account = (props: AccountProps): ReactElement<AccountProps> => {
	const getSession = async () => {
		await new Promise((resolve, reject) => {
			const user = Pool.getCurrentUser();
			if (user) {
				user.getSession((err: any, session: any) => {
					if (err) {
						reject();
					} else {
						resolve(session);
					}
				});
			} else {
				reject();
			}
		});
	};

	const authenticate = async (email: string, password: string) =>
		await new Promise((resolve, reject) => {
			const user = new CognitoUser({ Username: email, Pool });

			const authDetails = new AuthenticationDetails({ Username: email, Password: password });

			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					resolve(data);
				},

				onFailure: (err) => {
					reject(err);
				},

				newPasswordRequired: (data) => {
					resolve(data);
				},
			});
		});

	const logout = () => {
		const user = Pool.getCurrentUser();
		if (user) {
			user.signOut();
			window.location.reload();
		}
	};

	return (
		<AccountContext.Provider value={{ authenticate, getSession, logout }}>
			{props.children}
		</AccountContext.Provider>
	);
};

export { Account, AccountContext };
