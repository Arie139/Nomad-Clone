const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: function (value) {
				const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
				return emailRegex.test(value);
			},
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return value.length >= 8; // Minimum length of 8 characters
			},
			message: (props) => 'Password must be at least 8 characters long!',
		},
	},
});

// Hash the password before saving the user model
UserSchema.pre('save', async function (next) {
	try {
		const user = this;

		if (!user.isModified('password')) {
			return next();
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);

		user.password = hash;
		next();
	} catch (error) {
		return next(error);
	}
});

module.exports = mongoose.model('User', UserSchema, 'user');
