const User = require('../models/UserModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');

module.exports.signup = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email and password are required' });
		}

		// Email validation
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: 'Invalid email format' });
		}

		// Password strength validation
		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: 'Password must be at least 8 characters long' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});

		const token = createSecretToken(newUser._id);
		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
		});

		newUser.password = undefined;

		res.status(201).json({
			message: 'User signed up successfully',
			success: true,
			user: newUser,
			token: token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		const token = createSecretToken(user._id);
		if (!token) {
			return res.status(500).json({ message: 'Could not generate token' });
		}

		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
		});

		res.status(200).json({
			message: 'User logged in successfully',
			success: true,
			token: token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
