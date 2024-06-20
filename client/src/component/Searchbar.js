import React, { useState } from 'react';
import './Searchbar.css';
import CityCard from './CityCard';
import CityContainer from './CityContainer';
import ContinentFilter from './ContinentFilter';

const SearchBar = () => {
	const [query, setQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchExecuted, setSearchExecuted] = useState(false);
	const [selectedCity, setSelectedCity] = useState(null);

	const search = async (event) => {
		event.preventDefault();
		if (query.trim() === '') {
			alert('Please enter a search');
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:3001/cities/search?query=${query}`
			);
			if (response.ok) {
				const cities = await response.json();
				const sortedCities = cities.sort((a, b) => a.Rank - b.Rank);
				setSearchResults(sortedCities);
				setSearchExecuted(true);
			} else {
				console.error('Error searching cities:', response.statusText);
			}
		} catch (error) {
			console.error('Error searching cities:', error);
		}
		setQuery('');
	};

	const clearFilter = () => {
		setSearchResults([]);
		setSearchExecuted(false);
	};

	const handleSelect = (city) => {
		setSelectedCity(city);
	};

	const handleFilter = async (continent) => {
		try {
			const response = await fetch(
				`http://localhost:3001/cities/search?query=${continent}`
			);
			if (response.ok) {
				const cities = await response.json();
				const sortedCities = cities.sort((a, b) => a.Rank - b.Rank);
				setSearchResults(sortedCities);
				setSearchExecuted(true);
			} else {
				console.error('Error fetching cities:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching cities:', error);
		}
	};

	return (
		<div>
			<div className='search'>
				<form className='search_bar_container' onSubmit={search}>
					<input
						className='search_bar'
						type='text'
						value={query}
						placeholder='Search for a city...'
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className='search_button' type='submit'>
						&#43;
					</button>
				</form>
				<ContinentFilter onFilter={handleFilter} />{' '}
				{/* include the new component */}
				{searchExecuted && (
					<button className='clear_button' onClick={clearFilter}>
						Clear Filter
					</button>
				)}
			</div>
			{searchExecuted ? (
				<main className='CityContainer'>
					<ul>
						{searchResults.map((city) => (
							<CityCard
								key={city._id}
								city={city}
								isSelected={selectedCity === city}
								onSelect={handleSelect}
							/>
						))}
					</ul>
				</main>
			) : (
				<CityContainer />
			)}
		</div>
	);
};

export default SearchBar;
