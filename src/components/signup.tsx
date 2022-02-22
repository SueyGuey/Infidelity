import React, { FormEvent, ReactElement, useState } from 'react';
import '../css/login.css';
import { validateEmail, validatePassword } from '../textUtils';
import UserPool from '../authentication/userPool';
import { CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import { AccountContext } from '../authentication/accounts';

export default function Signup(): ReactElement {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [cognitoUser, setCognitoUser] = useState<CognitoUser>();
	const [signUpPressed, setSignUpPressed] = useState(false);
	const [userId, setUserId] = useState('');

	const [errStatus, setErrStatus] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConPassword, setShowConPassword] = useState(false);
	

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}
	function toggleShowConPassword() {
		setShowConPassword(!showConPassword);
	}

	function handleSignUpSubmit(
		event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
	) {
		event.preventDefault();
		const attributeList = [];

		if (!validateEmail(email)) {
			setErrStatus('Please enter a valid Email Address!');
		} else if (!validatePassword(password)) {
			setErrStatus(
				'Password must consist of an uppercase and lowercase letter and must be atleast 8 characters long!'
			);
		} else if (password !== conPassword) {
			setErrStatus('Your password and confirmation password do not match!');
		} else {
			const attributeUsername = new CognitoUserAttribute({
				Name: 'preferred_username',
				Value: username,
			});
			attributeList.push(attributeUsername);
			UserPool.signUp(
				email,
				password,
				attributeList,
				[],
				(err?: Error, data?: ISignUpResult) => {
					if (err) {
						const errorMessage = err.message.toString();
						setErrStatus(errorMessage);
						return;
					} else if (data) {
						setCognitoUser(data.user);
						setSignUpPressed(true);
						setUserId(data.userSub);
					} else {
						console.error('Error creating user');
					}
				}
			);
		}
	}

	return (
		<div className="sign-up-form">
			<div id="username">
				<p className="signup-input-label">Username</p>
				<input
					className="signup-input"
					type="username"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div id="email">
				<p className="signup-input-label">Email</p>
				<input
					className="signup-input"
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div id="password">
				<p className="signup-input-label">Password</p>
				<input
					className="signup-input"
					type={showPassword ? 'text' : 'password'}
					id="password"
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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
			</div>
			<div id="password">
				<p className="signup-input-label">Confirm Password</p>
				<input
					type={showConPassword ? 'text' : 'password'}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					required={true}
					className="signup-input"
					spellCheck={false}
					id="password"
					value={conPassword}
					onChange={(e) => setConPassword(e.target.value)}
				/>
				<button
					onClick={toggleShowConPassword}
					onMouseDown={(e) => e.preventDefault()}
					className="eye-button">
					{showConPassword ? 'Hide' : 'Show'}
				</button>
			</div>
			{errStatus !== '' && (
				<div className="login-error-message">
					<p>{errStatus}</p>
				</div>
			)}
			<div className="info"></div>
			<button
				className="signup-button"
				onClick={(e) => {
					handleSignUpSubmit(e);
				}}
				type="submit">
				Create Account
			</button>
		</div>
	);
}
