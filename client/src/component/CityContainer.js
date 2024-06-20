import React, { useEffect, useState } from 'react';
import CityCard from './CityCard';
import './CityContainer.css';

const CityContainer = () => {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/cities/search')
			.then((response) => response.json())
			.then((data) => {
				const sortedData = data.sort((a, b) => a.Rank - b.Rank);
				setCities(sortedData);
			})
			.catch((error) => console.error('Error fetching cities:', error));
	}, []);

	return (
		<main className='CityContainer'>
			<ul>
				{cities.map((city) => (
					<CityCard
						key={city._id}
						city={city}
						isSelected={city === selectedCity}
						onSelect={() => setSelectedCity(city)}
					/>
				))}
			</ul>
		</main>
	);
};

export default CityContainer;
