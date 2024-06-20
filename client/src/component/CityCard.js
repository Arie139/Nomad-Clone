import React, { useState } from 'react';
import './CityCard.css';
import FillMeter from './FillMeter';
import ModalPortal from './ModalPortal';

const CityCard = ({ city, isSelected, onSelect }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState('overview');

	let cardStyle = {
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '240px',
		width: '320px',
		position: 'relative',
	};

	if (city.img) {
		const imageName = city.img;
		cardStyle.backgroundImage = `url(${require(`../images/${imageName}`)})`;
	}

	const handleCardClick = () => {
		onSelect(city);
	};

	const handleDetailsClick = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	return (
		<li style={cardStyle} className='CityCard' onClick={handleCardClick}>
			<div className='city-details' onClick={handleDetailsClick}>
				<div className='detail-item'>
					<span>Overall</span>
					<FillMeter
						styleType='hover'
						type='rank'
						rank={city.Rank}
						maxRank={20}
					/>
				</div>
				<div className='detail-item'>
					<span>Cost</span>
					<FillMeter styleType='hover' type='cost' cost={city.Cost} />
				</div>
				<div className='detail-item'>
					<span>Quality of Life</span>
					<FillMeter
						styleType='hover'
						type='quality'
						quality={city.QualityOfLife}
					/>
				</div>
				<div className='detail-item'>
					<span>Income</span>
					<FillMeter
						styleType='hover'
						type='income'
						income={city.IncomeLevel}
					/>
				</div>
				<div className='detail-item'>
					<span>Happiness</span>
					<FillMeter
						styleType='hover'
						type='happiness'
						happiness={city.Happiness}
					/>
				</div>
			</div>
			<div className='city-card-content'>
				<h1 className='city-name'>{city.City}</h1>
				<h2 className='city-country'>{city.Country}</h2>
				<span className='city-rank'>{city.Rank}</span>
			</div>
			{isModalOpen && (
				<ModalPortal city={city}>
					<div className='modal'>
						<button className='close-button-modal' onClick={closeModal}>
							X
						</button>
						<div className='modal-cover'>
							<img src={require(`../images/${city.img}`)} alt={city.City} />
							<h1 className='modal-header'>{city.City}</h1>
						</div>
						<div className='modal-tabs'>
							<button
								onClick={() => handleTabClick('overview')}
								className={selectedTab === 'overview' ? 'active' : ''}
							>
								Overview
							</button>
							<button
								onClick={() => handleTabClick('scores')}
								className={selectedTab === 'scores' ? 'active' : ''}
							>
								Scores
							</button>
							<button
								onClick={() => handleTabClick('prosAndCons')}
								className={selectedTab === 'prosAndCons' ? 'active' : ''}
							>
								Pros and Cons
							</button>
						</div>
						{selectedTab === 'overview' && (
							<div className='modal-content'>
								<div className='overview'>
									<div className='overview-item'>
										<span>Rank:</span> {city.Rank}
									</div>
									<div className='overview-item'>
										<span>City:</span> {city.City}
									</div>
									<div className='overview-item'>
										<span>Population:</span> {city.Population}
									</div>
									<div className='overview-item'>
										<span>Best Neighborhood:</span> {city.BestNeighborhood}
									</div>
									<div className='overview-item'>
										<span>Country:</span> {city.Country}
									</div>
									<div className='overview-item'>
										<span>Continent:</span> {city.Continent}
									</div>
								</div>
							</div>
						)}
						{selectedTab === 'scores' && (
							<div className='modal-content'>
								<div className='score-item'>
									<span>Overall</span>
									<FillMeter
										styleType='score'
										type='rank'
										rank={city.Rank}
										maxRank={20}
									/>
								</div>
								<div className='score-item'>
									<span>Quality of Life</span>
									<FillMeter
										styleType='score'
										type='quality'
										quality={city.QualityOfLife}
									/>
								</div>
								<div className='score-item'>
									<span>Cost</span>
									<FillMeter styleType='score' type='cost' cost={city.Cost} />
								</div>
								<div className='score-item'>
									<span>Cost Of Living Local</span>
									<FillMeter
										styleType='score'
										type='cost'
										cost={city.CostOfLivingLocal}
									/>
								</div>
								<div className='score-item'>
									<span>Cost Of Living Tourist</span>
									<FillMeter
										styleType='score'
										type='cost'
										cost={city.CostOfLivingTourist}
									/>
								</div>
								<div className='score-item'>
									<span>Cost Of Living Family</span>
									<FillMeter
										styleType='score'
										type='cost'
										cost={city.CostOfLivingFamily}
									/>
								</div>
								<div className='score-item'>
									<span>Income</span>
									<FillMeter
										styleType='score'
										type='income'
										income={city.IncomeLevel}
									/>
								</div>
								<div className='score-item'>
									<span>Weather</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.Weather}
									/>
								</div>
								<div className='score-item'>
									<span>Temperature</span>
									<FillMeter
										styleType='score'
										type='temperature'
										temperature={city.Temperature}
									/>
								</div>
								<div className='score-item'>
									<span>Humidity</span>
									<FillMeter
										styleType='score'
										type='humidity'
										humidity={city.Humidity}
									/>
								</div>
								<div className='score-item'>
									<span>Air Quality</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.AirQuality}
									/>
								</div>
								<div className='score-item'>
									<span>Safety</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.Safety}
									/>
								</div>
								<div className='score-item'>
									<span>Education Level</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.EducationLevel}
									/>
								</div>
								<div className='score-item'>
									<span>Vulnerability To Climate Change</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.VulnerabilityToClimateChange}
									/>
								</div>
								<div className='score-item'>
									<span>Happiness</span>
									<FillMeter
										styleType='score'
										type='happiness'
										happiness={city.Happiness}
									/>
								</div>
							</div>
						)}
						{selectedTab === 'prosAndCons' && (
							<div className='modal-content'>
								<div className='pros-cons-container'>
									<div className='pros'>
										{city.Pros.map((pro, index) => (
											<p key={index}>&#9989;&#160; {pro}</p>
										))}
									</div>
									<div className='cons'>
										{city.Cons.map((con, index) => (
											<p key={index}>&#10060;&#160; {con}</p>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</ModalPortal>
			)}
		</li>
	);
};

export default CityCard;
