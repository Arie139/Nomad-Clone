import React from 'react';
import './ContinentFilter.css';

const ContinentFilter = ({ onFilter }) => {
	const continents = [
		'Africa',
		'Asia',
		'Australia',
		'Europe',
		'North America',
		'South America',
	];

	return (
		<div className='continent-filter'>
			{continents.map((continent) => (
				<button key={continent} onClick={() => onFilter(continent)}>
					{continent}
				</button>
			))}
		</div>
	);
};

export default ContinentFilter;
