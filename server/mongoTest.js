const mongoose = require('mongoose');
const CitiesModel = require('./src/models/Cities');
require('dotenv').config();
const { MONGO_URL } = process.env;
// Connect to MongoDB
mongoose.connect(MONGO_URL);

// Check if the connection is successful
mongoose.connection.once('open', async () => {
	console.log('Connected to MongoDB');

	try {
		// Fetch data from the 'cities.city' collection
		const cities = await CitiesModel.find();
		console.log('Cities:', cities);
	} catch (error) {
		console.error('Error fetching cities:', error);
	} finally {
		// Close the connection after fetching data
		await mongoose.connection.close();
	}
});

// Handle connection errors
mongoose.connection.on('error', (error) => {
	console.error('MongoDB connection error:', error);
});
