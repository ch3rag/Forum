// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
	connection: {
		host : 'localhost',
		database: 'forum-db',
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	  },
  },
  production: {
    client: 'pg',
	connection: process.env.DATABASE_URL,
  },
};
