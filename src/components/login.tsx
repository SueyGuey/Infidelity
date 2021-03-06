import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, AccountContext } from '../authentication/accounts';
import userPool from '../authentication/userPool';
import TextField from '@mui/material/TextField';
import '../css/login.css';
import { SignupVerification } from './signup';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login(): ReactElement {
	const [errStatus, setErrStatus] = useState(''); //handles display of error status
	const [username, setUsername] = useState(''); //handles entry of username
	const [password, setPassword] = useState(''); //handles entry of password
	const [showVerification, setVerification] = useState(false); //handles verification state
	const [cogUser, setCogUser] = useState<CognitoUser>();
	const [showPassword, setShowPassword] = useState(false); //show or hide password when logging in

	const navigate = useNavigate();
	const context = useContext(AccountContext);
	const authenticate = context.authenticate;

	//on attempting to login, logs in if information is valid. Gives various error messages displayed below otherwise.
	function handleSubmit(event: React.SyntheticEvent): void {
		event.preventDefault();
		authenticate(username, password)
			.then((_data) => {
				navigate('/dashboard');
				location.reload();
			})
			.catch((err: Error) => {
				const errorMessage = err.message;
				if (errorMessage === 'Incorrect username or password.') {
					setErrStatus('Incorrect username or password');
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
					setErrStatus('Error logging in.');
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
		<div className="login-container">
			<TextField
				className="text-field"
				id="login-username-field"
				label="Username or Email"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			{/* Users can log in using either username or email associated with account */}
			<TextField
				className="text-field"
				id="outlined"
				label="Password"
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				InputProps={{
					// <-- This is where the toggle button is added.
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			{/* Users enter password here, can toggle visibility */}

			{errStatus !== '' && (
				<div className="login-error-message">
					<p>{errStatus}</p>
				</div>
			)}
			{/* displays error message if error is thrown */}
			<Button className="login-button" variant="contained" onClick={handleSubmit}>
				Log In
			</Button>
			{/* Submit login attempt */}
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
