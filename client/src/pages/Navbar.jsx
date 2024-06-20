import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const [cookies, removeCookie] = useCookies(['token']);
	const [showDropdown, setShowDropdown] = useState(false);

	const logout = () => {
		// Remove token from cookies and redirect to login page
		removeCookie('token');
		navigate('/login');
		setShowDropdown(false);
	};

	const handleLinkClick = () => {
		setShowDropdown(false);
	};

	return (
		<nav>
			<ul className='navbar'>
				<li className='dropdown'>
					<button
						className='dropbtn'
						onClick={() => setShowDropdown(!showDropdown)}
					>
						&#9776;
					</button>
					{showDropdown && (
						<div className='dropdown-content'>
							<div onClick={handleLinkClick}>
								<Link to='/'>Home</Link>
							</div>
							{cookies.token ? (
								<button className='navBut' onClick={logout}>
									Logout
								</button>
							) : (
								<div onClick={handleLinkClick}>
									<Link to='/login'>Login</Link>
								</div>
							)}
						</div>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
