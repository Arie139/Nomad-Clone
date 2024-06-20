import React from 'react';
import './FillMeter.css';

const FillMeter = ({
	styleType,
	rank,
	maxRank,
	cost,
	quality,
	income,
	happiness,
	type,
	temperature,
	humidity,
}) => {
	let value;

	if (type === 'rank') {
		value = ((maxRank - rank + 1) / maxRank) * 100;
	} else if (type === 'cost') {
		const costToValue = {
			'very high': 25,
			high: 50,
			medium: 65,
			low: 75,
			'very low': 90,
		};
		value = costToValue[cost.toLowerCase()];
	} else if (type === 'quality') {
		const qualityToValue = {
			great: 90,
			good: 75,
			okay: 60,
			poor: 50,
			'very poor': 25,
		};
		value = qualityToValue[quality.toLowerCase()];
	} else if (type === 'income') {
		const incomeToValue = {
			'very high': 95,
			high: 90,
			medium: 60,
			low: 50,
			'very low': 25,
		};
		value = incomeToValue[income.toLowerCase()];
	} else if (type === 'happiness') {
		const happinessToValue = {
			great: 85,
			good: 61,
			okay: 55,
			poor: 40,
			bad: 40,
		};
		value = happinessToValue[happiness.toLowerCase()];
	} else if (type === 'temperature') {
		const costToValue = {
			'too cold': 25,
			cold: 50,
			okay: 65,
			hot: 75,
			'too hot': 90,
		};
		value = costToValue[temperature.toLowerCase()];
	} else if (type === 'humidity') {
		const costToValue = {
			dry: 90,
			comfy: 66,
			humid: 30,
		};
		value = costToValue[humidity.toLowerCase()];
	}
	const getMeterColor = (value) => {
		if (value <= 33) {
			return 'red';
		} else if (value <= 66) {
			return 'yellow';
		} else {
			return 'green';
		}
	};

	let meterClass = 'meter';
	if (styleType === 'score') {
		meterClass += ' meter-score';
	} else if (styleType === 'hover') {
		meterClass += ' meter-hover';
	}

	return (
		<div className={meterClass}>
			<div
				className='meter-fill'
				style={{
					width: `${value}%`,
					backgroundColor: getMeterColor(value),
				}}
			/>
		</div>
	);
};

export default FillMeter;
