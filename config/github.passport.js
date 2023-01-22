const { Strategy } = require("passport-github2");
const { findUser, addUser } = require("../models/users.model");
const config = {
  CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};
console.log(config);
const AUTH_OPTIONS = {
  callbackURL: "/auth/github/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};
function github(passport) {
  passport.use(
    new Strategy(AUTH_OPTIONS, (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.username,
        image: profile.photos[0].value,
        email: profile.emails[0].value,
      };
      console.log(newUser);
      done(null, profile);
    })
  );
}
module.exports = github;
