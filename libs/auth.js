'use strinct';

const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = () =>
  passport.authenticate('master', { session: false })

passport.use('master', new Strategy(
  (token, done) => {

    if (token === TOKEN_KEY) {
      done(null, {})
    } else {
      done(null, false)
    }
  }));

module.exports = verifyToken;