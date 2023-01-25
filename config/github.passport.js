const { Strategy } = require("passport-github2");
const { findUser, addUser } = require("../models/users.model");

const config = {
  CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/github/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function github(passport) {
  passport.use(
    new Strategy(
      AUTH_OPTIONS,
      async (accessToken, refreshToken, profile, done) => {
        try {
          const newUser = {
            userId: profile.id,
            username: profile.username,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
          };
          let user = await findUser(newUser.userId);
          if (user) {
            done(null, user);
          } else {
            user = await addUser(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
          res.render("error", {
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
module.exports = github;
