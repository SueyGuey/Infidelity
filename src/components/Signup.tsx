import React, { ReactElement, useState } from 'react';
import '../css/Signup.css';

export default function Signup(): ReactElement {
	const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

	return (
		<div className='login-container'>
			<h3>Sign Up</h3>
			<input className='text-input'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			></input>
            <input className='text-input'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			></input>
			<input className='text-input'
				placeholder='Password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></input>
            <input className='text-input'
				placeholder='Confirm Password'
				type='password'
				value={confirm}
				onChange={(e) => setConfirm(e.target.value)}
			></input>
		</div>
	);
}
