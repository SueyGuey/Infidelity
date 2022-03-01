import React, { FormEvent, ReactElement, useContext, useState } from 'react';
import '../css/login.css';
import { validateEmail, validatePassword } from '../textUtils';
import UserPool from '../authentication/userPool';
import { CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import { AccountContext } from '../authentication/accounts';
import { useNavigate } from 'react-router-dom';


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
		<div>
			<div>
				<form onSubmit={validateVerificationCode}>
					<div>
						<h3>Verify Account</h3>
						<p>
							For your protection, we need to verify that this email is yours.
							Please enter the code we sent to your email address below.
						</p>
						<input
							autoFocus
							type="text"
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
					{verificationErrStatus !== '' && (
						<div className="login-error-message">
							<p>{verificationErrStatus}</p>
						</div>
					)}
					<button
						id="submitForEmailVerificationButton"
						onClick={validateVerificationCode}
						type="submit"
						disabled={!validateForm2()}>
						Submit
					</button>
					<div>
						<p
							className="signupLiteDidntRecieveText"
							style={{ margin: '10px 0 42px 0' }}>
							{"Didn't recieve the verfication code? "}
							<button
								className="signUpLiteResendCodeBtn"
								id="resendCodeButton"
								onClick={(e) => handleResendCode(e)}>
								<div className="signupLiteResendCodeText"> Resend Code </div>
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
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

		if (!validateEmail(props.email)) {
			setErrStatus('Please enter a valid Email Address!');
		} else if (!validatePassword(props.password)) {
			setErrStatus(
				'Password must consist of an uppercase and lowercase letter and must be atleast 8 characters long!'
			);
		} else if (props.password !== conPassword) {
			setErrStatus('Your password and confirmation password do not match!');
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
			<h3>Sign Up</h3>
			<div id="username">
				<p>Username</p>
				<input
					className="text-input"
					type="username"
					id="username"
					placeholder="username"
					value={props.username}
					onChange={(e) => props.setUsername(e.target.value)}
				/>
			</div>
			<div id="email">
				<p>Email</p>
				<input
					className="text-input"
					type="email"
					id="email"
					value={props.email}
					onChange={(e) => props.setEmail(e.target.value)}
				/>
			</div>
			<div id="password">
				<p>Password</p>
				<input
					className="text-input"
					type={showPassword ? 'text' : 'password'}
					id="password"
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					spellCheck={false}
					value={props.password}
					onChange={(e) => props.setPassword(e.target.value)}
				/>
				<button
					onClick={toggleShowPassword}
					onMouseDown={(e) => e.preventDefault()}
					className="eye-button">
					{showPassword ? 'Hide' : 'Show'}
				</button>
			</div>
			<div id="password">
				<p>Confirm Password</p>
				<input
					type={showConPassword ? 'text' : 'password'}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					required={true}
					className="text-input"
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
