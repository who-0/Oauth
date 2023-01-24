const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const {
  httpGetLogin,
  httpGetSignup,
  httpGoogleCallback,
  httpGithubCallback,
  httpUserSignup,
  httpUserLogin,
  httpError,
  httpLogout,
} = require("../controllers/auth.controller");

authRouter.get("/login", httpGetLogin);

authRouter.get("/signup", httpGetSignup);
//! Google ---------------
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/error",
  }),
  httpGoogleCallback
);
//! Github -------------------------

authRouter.get("/github", passport.authenticate("github", { scope: ["user"] }));

authRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  httpGithubCallback
);

//! Signup User account ------------------------------
authRouter.post("/signup", httpUserSignup);

authRouter.post("/login", httpUserLogin);

authRouter.get("/error", httpError);

authRouter.get("/logout", httpLogout);

module.exports = authRouter;
