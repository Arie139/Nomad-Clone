const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

const userVerification = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res
				.status(401)
				.json({ status: false, error: 'No token provided' });
		}

		let decodedToken;
		try {
			decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
		} catch (err) {
			return res
				.status(401)
				.json({ status: false, error: 'Invalid or expired token' });
		}

		const user = await User.findById(decodedToken.id);

		if (!user) {
			return res.status(404).json({ status: false, error: 'User not found' });
		}

		req.user = user;
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, error: 'Internal Server Error' });
	}
};

module.exports = { userVerification };
