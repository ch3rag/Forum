const express = require('express');
const categories = require('../queries/categories');
const router = express.Router();
const { checkAuthHeaderSetUserUnauthorized, isAdmin } = require('../middlewares');

router.post('/', checkAuthHeaderSetUserUnauthorized, isAdmin, async (req, res, next) => {
	try {
		const category = await categories.insert(req.body);
		res.json(category);
	} catch (err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const allCategories = await categories.getAll();
		res.json(allCategories);
	} catch (err) {
		next(err);
	}
});

module.exports = router;