const GoogleStrategy = require('passport-google-oauth2').Strategy;
const users = require('../queries/users');

module.exports = new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback',
	passReqToCallback: true,
},
	async (request, accessToken, refreshToken, profile, done) => {
		const email = profile.email;
		
		const googleUser = {
			display_name: profile.displayName,
			email: profile.email,
			google_id: profile.id,
			image_url: profile.photos[0].value,
			role_id: 1,
		};
		
		try {
			let user = await users.findByEmail(email);

			if (user) {
				googleUser.role_id = user.role_id;
				user = await users.update(user.id, googleUser);
			} else {
				// set the current user as admin if there are no admins
				const admins = await users.findAdmins();
				console.log("admins length " + admins.length);
				if(admins.length === 0) {
					googleUser.role_id = 3;
				}

				user = await users.insert(googleUser);
			}
			return done(null, user);
		} catch(err) {
			return done(err);
		}
	}
);
