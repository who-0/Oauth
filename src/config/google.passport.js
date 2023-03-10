const { Strategy } = require("passport-google-oauth20");
const { findUser, addUser } = require("../models/users.model");

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

//!--------------------------------------------------------------------------

function google(passport) {
  passport.use(
    new Strategy(
      AUTH_OPTIONS,
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          userId: profile.id,
          username: profile.displayName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };
        try {
          let user = await findUser(newUser.userId);
          if (user) {
            done(null, user);
          } else {
            user = await addUser(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          res.render("pages/error", {
            message: "Plase Try again later. Our system is missing something.",
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
}

module.exports = google;
