// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
	connection: {
		host : 'localhost',
		database: 'forum-db',
		user: 'postgres',
		password: 'chirag2908'
	  },
  },
  production: {
    client: 'pg',
	connection: process.env.DATABASE_URL,
  },
};
