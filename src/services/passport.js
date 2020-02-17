const passport = require('passport');
const GoogleStrat = require('passport-google-oauth20');

passport.use(new GoogleStrat({
  //  options
  callbackURL: 'auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT,
  clientSecret: process.env.GOOGLE_SECRET,
}), () => {
  // callback
});
