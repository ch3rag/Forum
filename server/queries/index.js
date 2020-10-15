const db = require('../db');


async function insertIntoTableAndValidate(table_name, item, schema) {
	const result = schema.validate(item);
	if(!result.error) {
		const rows = await db(table_name).insert(item, '*');
		return rows[0];
	} else {
		return Promise.reject(result.error);
	}
}

module.exports = {
	insertIntoTableAndValidate,
}