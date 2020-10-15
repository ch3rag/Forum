const { verify } = require('../auth/utils');

function notFound(req, res, next) {
	const error = new Error('Not Found - ' + req.originalUrl);
	res.status(404);
	next(error);
}

function errorHandler(error, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		message: error.message,
		error: process.env.NODE_ENV === 'production' ? {} : error.stack,
	})
}

async function checkAuthHeaderSetUser(req, res, next) {
	const authHeader = req.get('authorization')
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		try {
			const user = await verify(token);
			req.user = user;
		} catch (err) {
			console.error(err);
		}
	}
	next();
}

async function checkAuthHeaderSetUserUnauthorized(req, res, next) {
	const authHeader = req.get('authorization')
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		try {
			const user = await verify(token);
			req.user = user;
			return next();
		} catch (err) {
			console.error(err)
		}
	}
	res.status(401);
	next(new Error('Un-Authorized'));
}

function isAdmin(req, res, next) {
	if (req.user && req.user.role_id === 3) {
		return next();
	}
	res.status(401);
	next(new Error('Un-Authorized'));
}

module.exports = {
	notFound,
	errorHandler,
	checkAuthHeaderSetUser,
	checkAuthHeaderSetUserUnauthorized,
	isAdmin,
};
