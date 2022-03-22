import React, { FormEvent, ReactElement, useContext, useState } from 'react';
import '../css/login.css';
import { validateEmail, validatePassword } from '../textUtils';
import UserPool from '../authentication/userPool';
import { CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import { AccountContext } from '../authentication/accounts';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createUser } from '../endpoints';

type VerificationProps = {
	cognitoUser?: CognitoUser;
	userId?: string;
	username: string;
	email: string;
	password: string;
};

export function SignupVerification(props: VerificationProps): ReactElement<VerificationProps> {
	const [verificationErrStatus, setVerificationErrStatus] = useState('');
	const [code, setCode] = useState('');
	const navigate = useNavigate();

	const context: any = useContext(AccountContext);
	const authenticate: any = context.authenticate;

	function validateForm2(): boolean {
		return code.length > 0;
	}

	function validateVerificationCode(event: FormEvent) {
		event.preventDefault();
		if (props.cognitoUser) {
			props.cognitoUser.confirmRegistration(code, true, (err?: Error, _result?: any) => {
				if (err && !err.message.includes('Current status is CONFIRMED')) {
					console.error(err);
					setVerificationErrStatus('Verification provided is incorrect.');
				} else {
					authenticate(props.username, props.password)
						.then((_data: any) => {
							createUser({
								username: props.username,
								email: props.email
							});
							navigate('/dashboard');
						})
						.catch((err: Error) => {
							console.error('Failed to login!', err);
						});
				}
			});
		}
	}

	function handleResendCode(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.preventDefault();
		if (props.cognitoUser) {
			setCode('');
			setVerificationErrStatus('');
			props.cognitoUser.resendConfirmationCode((err?: Error, result?: any) => {
				if (err) {
					console.error(err);
				} else console.log('RESULT SUCCESS :', result);
			});
		}
	}

	return (
		<form onSubmit={validateVerificationCode} className="signup-container">
			<div className="verification-container">
				<h3>Verify Account</h3>
				<br />
				<p>
					Please enter the code we sent to your email address below
				</p>
				<br />
				<TextField
					autoFocus={true}
					className="text-field verification-field"
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
				{verificationErrStatus !== '' && (
					<div className="login-error-message">
						<p>{verificationErrStatus}</p>
					</div>
				)}
				<Button
					className="verify-button"
					onClick={validateVerificationCode}
					variant="contained"
					disabled={!validateForm2()}>
					Submit
				</Button>
			</div>
			<div className="resend-prompt">
				<p>Didn't recieve the verfication code?</p>
				<Button
					className="resend-code-button"
					variant="text"
					onClick={(e) => handleResendCode(e)}>
						Resend Code
				</Button>
			</div>
		</form>
	);
}

export type SignupFormProps = {
	username: string
	email: string;
	password: string;
	accessCode: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	setAccessCode: React.Dispatch<React.SetStateAction<string>>;
	setCognitoUser: React.Dispatch<React.SetStateAction<CognitoUser | undefined>>;
	setSignUpPressed: React.Dispatch<React.SetStateAction<boolean>>;
	setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export function SignupForm(props: SignupFormProps): ReactElement<SignupFormProps> {
	const [errStatus, setErrStatus] = useState('');
	const [conPassword, setConPassword] = useState('');

	function handleSignUpSubmit(
		event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>
	) {
		event.preventDefault();
		const attributeList = [];

		if (!validateEmail(props.email)) {
			setErrStatus('Please enter a valid Email Address!');
		} else if (!validatePassword(props.password)) {
			setErrStatus(
				'Password must consist of an uppercase and lowercase letter and must be atleast 8 characters long'
			);
		} else if (props.password !== conPassword) {
			setErrStatus('Your password and confirmation password do not match');
		} else {
			const attributeUsername = new CognitoUserAttribute({
				Name: 'preferred_username',
				Value: props.username,
			});
			const attributeEmail = new CognitoUserAttribute({
				Name: 'email',
				Value: props.email,
			});
			attributeList.push(attributeUsername);
			attributeList.push(attributeEmail);
			UserPool.signUp(
				props.username,
				props.password,
				attributeList,
				[],
				(err?: Error, data?: ISignUpResult) => {
					if (err) {
						const errorMessage = err.message.toString();
						setErrStatus(errorMessage);
						return;
					} else if (data) {
						props.setCognitoUser(data.user);
						props.setUserId(data.userSub);
						props.setSignUpPressed(true);
					} else {
						console.error('Error creating user');
					}
				}
			);
		}
	}

	return (
		<div className="signup-container">
			<TextField
				className="text-field"
				id="signup-username-field"
				label="Username"
				value={props.username}
				onChange={(e) => props.setUsername(e.target.value)}
			/>
			<TextField
				className="text-field"
				id="signup-email-field"
				label="Email"
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
			/>
			<TextField
				className="text-field"
				id="signup-password"
				label="Password"
				type="password"
				value={props.password}
				onChange={(e) => props.setPassword(e.target.value)}
				/>
			<TextField
				className="text-field"
				id="signup-confirm-password"
				label="Confirm Password"
				type="password"
				value={conPassword}
				onChange={(e) => setConPassword(e.target.value)}
				/>
			{errStatus !== '' && (
				<div className="login-error-message">
					<p>{errStatus}</p>
				</div>
			)}
			<Button
				className="signup-button"
				variant="outlined"
				onClick={(e) => handleSignUpSubmit(e)}>Create Account</Button>
		</div>
	);
}

export default function Signup(): ReactElement {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [accessCode, setAccessCode] = useState('');
	const [cognitoUser, setCognitoUser] = useState<CognitoUser>();
	const [signUpPressed, setSignUpPressed] = useState(false);
	const [cogId, setCogId] = useState<string>('');

	return signUpPressed ? (
		<SignupVerification
			cognitoUser={cognitoUser}
			userId={cogId}
			username={username}
			email={email}
			password={password}></SignupVerification>
	) : (
		<SignupForm
			username={username}
			email={email}
			password={password}
			accessCode={accessCode}
			setUsername={setUsername}
			setEmail={setEmail}
			setPassword={setPassword}
			setAccessCode={setAccessCode}
			setCognitoUser={setCognitoUser}
			setSignUpPressed={setSignUpPressed}
			setUserId={setCogId}></SignupForm>
	);
}
