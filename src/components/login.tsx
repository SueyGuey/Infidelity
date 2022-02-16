import React, { ReactElement, useState } from 'react';
import '../css/login.css';

export default function Login(): ReactElement {
	// email or username
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className='login-container'>
			<h3>Log In</h3>
			<input className='text-input'
				placeholder='username or email'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			></input>
			<input className='text-input'
				placeholder='password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></input>
		</div>
	);
}
