import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, AccountContext } from '../authentication/accounts';
import userPool from '../authentication/userPool';
import '../css/login.css';
import { SignupVerification } from './Signup';

function Login(): ReactElement {
	const [errStatus, setErrStatus] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showVerification, setVerification] = useState(false);
	const [cogUser, setCogUser] = useState<CognitoUser>();
	const [showPassword, setShowPassword] = useState(false);
	
	const navigate = useNavigate();
	const context = useContext(AccountContext);
	const authenticate = context.authenticate;
	console.log(authenticate);

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	function handleSubmit(event: React.SyntheticEvent): void {
		event.preventDefault();
		authenticate(username, password)
			.then((data: CognitoUserSession) => {
				navigate('/dashboard');
			})
			.catch((err: Error) => {
				const errorMessage = err.message;
				if (errorMessage === 'Incorrect username or password.') {
					setErrStatus(
						"Please make sure your email and password are correct! If you need help, please hit the 'Forgot Password' Button!"
					);
					const e = document.getElementsByClassName(
						'loginFooter'
					) as HTMLCollectionOf<HTMLElement>;
					e[0].style.position = 'relative';
				} else if (errorMessage === 'User is not confirmed.') {
					const newCogUser = new CognitoUser({ Username: username, Pool: userPool });
					newCogUser.resendConfirmationCode((err?: Error, result?: any) => {
						if (err) {
							console.error(err);
						} else console.log('RESULT SUCCESS :', result);
					});
					setCogUser(newCogUser);
					setVerification(true);
				} else {
					console.error(err);
				}
			});
	}

	return showVerification ? (
		<SignupVerification
			cognitoUser={cogUser}
			email={username}
			username={username}
			password={password}></SignupVerification>
	) : (
		<div className='login-container'>
			<p>Username or Email</p>
			<input
				className="login-input"
				autoComplete="off"
				type="login"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<p>Password</p>
			<input
				className="login-input"
				type={showPassword ? 'text' : 'password'}
				autoComplete="off"
				required={true}
				spellCheck={false}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button
				onClick={toggleShowPassword}
				onMouseDown={(e) => e.preventDefault()}
				className="eye-button">
				{showPassword ? 'Hide' : 'Show'}
			</button>
			{errStatus !== '' && (
				<div className="login-error-message">
					<p>{errStatus}</p>
				</div>
			)}
			<button
				id="logInButton"
				onClick={handleSubmit}
				type="submit">
				Login
			</button>
		</div>
	);
}

export default function LoginWrap(): ReactElement {
	return (
		<Account>
			<Login />
		</Account>
	);
}
