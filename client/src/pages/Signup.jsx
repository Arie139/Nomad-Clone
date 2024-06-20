import './Signup.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
	});
	const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
	const { email, password } = inputValue;

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = (err) => {
		toast.error(err.response?.data?.message || err.message, {
			position: 'bottom-left',
		});
	};

	const handleSuccess = (msg) => {
		toast.success(msg, {
			position: 'bottom-right',
		});
		setInputValue({ email: '', password: '' }); // Clear input fields
		setSignupSuccess(true); // Set signup success state to true
		navigate('/login'); // Redirect to the login page
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				'http://localhost:3001/auth/signup',
				{
					...inputValue,
				},
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
		<div className='signup-container'>
			<div className='form_container'>
				<h2>Signup Account</h2>
				{!signupSuccess && ( // Render the form only if signup is not successful
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								value={email}
								placeholder='Enter your email'
								onChange={handleOnChange}
								required
							/>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								name='password'
								value={password}
								placeholder='Enter your password'
								onChange={handleOnChange}
								minLength={8}
								required
							/>
						</div>
						<button type='submit'>Submit</button>
						<span>
							Already have an account? <Link to={'/login'}>Login</Link>
						</span>
					</form>
				)}
				<ToastContainer />
				{signupSuccess && ( // Render the note only if signup was successful
					<p>
						Note: Your account has been created successfully. Please log in to
						access your account.
					</p>
				)}
			</div>
		</div>
	);
};

export default Signup;
