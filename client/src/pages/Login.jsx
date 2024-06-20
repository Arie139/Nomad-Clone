import './Login.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = (error) => {
		let errorMessage = 'An error occurred';
		if (error.response && error.response.data && error.response.data.message) {
			errorMessage = error.response.data.message;
		}
		toast.error(errorMessage, {
			position: 'bottom-left',
		});
	};

	const handleSuccess = (message) => {
		toast.success(message, {
			position: 'bottom-left',
		});
		setTimeout(() => {
			navigate('/');
		}, 1000);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				'http://localhost:3001/auth/login',
				inputValue,
				{ withCredentials: true }
			);
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
			} else {
				handleError({ message });
			}
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<div className='login-container'>
			<div className='form_container'>
				<h2>Login Account</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							value={inputValue.email}
							placeholder='Enter your email'
							onChange={handleOnChange}
							required
							autoComplete='email'
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							value={inputValue.password}
							placeholder='Enter your password'
							onChange={handleOnChange}
							required
							autoComplete='current-password'
						/>
					</div>
					<button type='submit'>Submit</button>
					<span>
						Don't have an account? <Link to={'/signup'}>Signup</Link>
					</span>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default Login;
