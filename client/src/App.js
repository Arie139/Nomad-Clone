import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Signup, Home, Navbar } from './pages';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
