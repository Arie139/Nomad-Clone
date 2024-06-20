import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import './Home.css';
import SearchBar from '../component/Searchbar';
import CityContainer from '../component/CityContainer';

const Home = () => {
	const [cookies] = useCookies(['token']);

	useEffect(() => {
		// If token exists, display welcome message
		if (cookies.token) {
			toast(`Welcome back!`, {
				position: 'top-right',
			});
		}
	}, [cookies.token]);

	return (
		<>
			<div className='home_page'>
				<div className='filters'>
					<SearchBar />
				</div>
				{/* <CityContainer /> */}
			</div>
			<ToastContainer />
		</>
	);
};

export default Home;
