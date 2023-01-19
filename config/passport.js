const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const { findUser, addUser, findById } = require("../models/users.model");
// const config = {
//   CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   COOKIE_KEY_1: process.env.COOKIE_KEY_1,
//   COOKIE_KEY_2: process.env.COOKIE_KEY_2,
// };
// const AUTH_OPTIONS = {
//   callbackURL: "/auth/google/callback",
//   clientID: config.CLIENT_ID,
//   clientSecret: config.CLIENT_SECRET,
// };

// const verifyCallback = async (accessToken, refreshToken, profile, done) => {
//   // const newUser = {
//   //   googleId: profile.id,
//   //   username: profile.displayName,
//   //   img: profile.photos[0].value,
//   //   email: profile.emails[0].value,
//   // };
//   // //todo console.log("newUser", newUser);
//   // let user = await findUser(newUser.googleId);
//   // //todo console.log("Exist User", user);
//   // if (user) {
//   //   done(null, user);
//   // } else {
//   //   user = await addUser(newUser);
//   //   console.log(user);
//   //   done(null, user);
//   // }
//   const newUser = {
//     googleId: profile.id,
//     displayName: profile.displayName,
//     image: profile.photos[0].value,
//     email: profile.emails[0].value,
//   };
//   try {
//     let user = await findUser(newUser.googleId);

//     if (user) {
//       //If user present in our database.
//       done(null, user);
//     } else {
//       // if user is not preset in our database save user data to database.
//       user = await addUser(newUser);
//       done(null, user);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// passport.serializeUser((user, done) => {
//   console.log(user);
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   findUser(id, (err, user) => done(err, user));
// });

// module.exports = (passport) => {
//   passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
// };
//!--------------------------------------------------------------------------

module.exports = function (passport) {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };
        try {
          // let user = await User.findOne({ googleId: profile.id });
          let user = await findUser(newUser.googleId);
          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            // user = await User.create(newUser);
            user = await addUser(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    findById(id).catch((err) => done(err, id));
  });
};
