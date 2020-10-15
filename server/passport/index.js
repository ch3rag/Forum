const passport = require('passport')

// google strategy
const googleStrategy = require('./google');

passport.use(googleStrategy);