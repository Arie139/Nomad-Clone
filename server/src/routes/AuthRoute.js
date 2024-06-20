const { signup, login } = require('../controllers/AuthController');
const { userVerification } = require('../middleware/AuthMiddleware');
const CitiesModel = require('../models/Cities');
const router = require('express').Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/verify', userVerification, (req, res) => {
	res.json({ status: true, message: 'User verified' });
});
router.get('/search', async (req, res) => {
	try {
		const query = req.query.query; // Get the search query from the request query parameters
		// Perform a case-insensitive search on various fields using regex
		const cities = await CitiesModel.find({
			$or: [
				{ Country: { $regex: new RegExp(query, 'i') } },
				{ City: { $regex: new RegExp(query, 'i') } },
				{ BestNeighborhood: { $regex: new RegExp(query, 'i') } },
				{ Continent: { $regex: new RegExp(query, 'i') } },
				{ QualityOfLife: { $regex: new RegExp(query, 'i') } },
				{ Cost: { $regex: new RegExp(query, 'i') } },
				{ Weather: { $regex: new RegExp(query, 'i') } },
				{ Temperature: { $regex: new RegExp(query, 'i') } },
				{ Humidity: { $regex: new RegExp(query, 'i') } },
				{ AirQuality: { $regex: new RegExp(query, 'i') } },
				{ Safety: { $regex: new RegExp(query, 'i') } },
				{ EducationLevel: { $regex: new RegExp(query, 'i') } },
				{ VulnerabilityToClimateChange: { $regex: new RegExp(query, 'i') } },
				{ IncomeLevel: { $regex: new RegExp(query, 'i') } },
				{ Happiness: { $regex: new RegExp(query, 'i') } },
				// Add any other fields you want to search through here
			],
		});
		res.json(cities);
	} catch (error) {
		console.error('Error searching cities:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});
module.exports = router;
