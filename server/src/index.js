const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const AuthRoute = require('./routes/AuthRoute');
const citiesRouter = require('./routes/AuthRoute');
const { MONGO_URL, PORT, TOKEN_KEY } = process.env;

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB is  connected successfully'))
	.catch((err) => console.error(err));

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(cookieParser());

app.use(express.json());

app.use('/auth', AuthRoute);
app.use('/cities', citiesRouter);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
