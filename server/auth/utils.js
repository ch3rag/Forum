const users = require('../queries/users');
const jwt = require('jsonwebtoken');

function create(user) {
	return new Promise((resolve, reject) => {
		jwt.sign(user, process.env.TOKEN_SECRET, {
			expiresIn: '1d'
		}, (err, token) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
}


function verify(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
			if (err) {
				return reject(err);
			}
			resolve(payload);
		});
	})
}

module.exports = {
	create,
	verify,
};
