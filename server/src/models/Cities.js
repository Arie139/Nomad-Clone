const mongoose = require('mongoose');

const CitiesSchema = new mongoose.Schema({
	Country: { type: String, required: true },
	City: { type: String, required: true, unique: true },
	Population: { type: Number },
	BestNeighborhood: { type: String, required: true },
	Rank: { type: Number, required: true, unique: true },
	Continent: { type: String, required: true },
	QualityOfLife: { type: String, required: true },
	Cost: { type: String, required: true },
	CostOfLivingLocal: { type: String, required: true },
	CostOfLivingTourist: { type: String, required: true },
	CostOfLivingFamily: { type: String, required: true },
	Weather: { type: String, required: true },
	Temperature: { type: String, required: true },
	Humidity: { type: String, required: true },
	AirQuality: { type: String, required: true },
	Safety: { type: String, required: true },
	EducationLevel: { type: String, required: true },
	VulnerabilityToClimateChange: { type: String, required: true },
	IncomeLevel: { type: String, required: true },
	Happiness: { type: String, required: true },
	Pros: { type: Array, required: true },
	Cons: { type: Array, required: true },
	img: { type: String },
});

const CitiesModel = mongoose.model('City', CitiesSchema, 'city');

module.exports = CitiesModel;
