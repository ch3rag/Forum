const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');


require('dotenv').config();

const auth = require('./auth');
const api = require('./api');

const app = express();

const  { notFound, errorHandler, checkAuthHeaderSetUser } = require('./middlewares');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());

app.use(checkAuthHeaderSetUser);

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Chirag\'s Forum 💖',
	});
});

app.use('/auth', auth);
app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
