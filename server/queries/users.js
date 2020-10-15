const db = require('../db');
const Joi = require('joi');
const { insertIntoTableAndValidate } = require('./index');

const schema = Joi.object().keys({
	display_name: Joi.string().required(),
	email: Joi.string().email().required(),
	google_id: Joi.string().required(),
	image_url: Joi.string().uri({
		scheme: [
			/https/
		],
	}),
	role_id: Joi.number().integer().required(),
});

module.exports = {
	findByEmail(email) {
		return db('users').where('email', email).first();
	},

	async findAdmins() {
		return await db('users').where('role_id', 3);
	},

	async update(id, user) {
		const rows = await db('users').where('id', id).update(user, '*');
		return rows[0];
	},

	insert(user) {
		return insertIntoTableAndValidate('users', user, schema);
	}
};
