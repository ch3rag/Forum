const express = require('express');
const passport = require('passport');
const router = express.Router();
const { create } = require('./utils')
// import strategies
require('../passport');

// setup admin route
router.get('/isAdmin', (req, res) => {
	console.log(req.user)
	if (req.user) {
		return res.json({
			isAdmin: req.user.role_id === 3,
		});
	}
	res.json({
		isAdmin: false,
	})
});

// routes for google oAuth
router.get('/google',
	passport.authenticate('google',
		{ scope: ['email', 'profile'] }
	));

router.get('/google/callback', (req, res, next) => {
	passport.authenticate('google', async (err, user, info) => {
		if (err) {
			next(err);
		}
		try {
			const token = await create(user);
			res.redirect(`${process.env.CLIENT_REDIRECT}${token}`);
		} catch (err) {
			res.redirect(`${process.env.CLIENT_ERROR_REDIRECT}${err.message}`);
		}
	})(req, res, next);
});

module.exports = router;