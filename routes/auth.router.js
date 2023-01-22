const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  return res.render("login");
});
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
  (req, res) => {
    return res.redirect("/");
  }
);
//! Github -------------------------

authRouter.get("/error", (req, res) => {
  res.send("something wrong");
});

authRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.render("login");
  });
});

module.exports = authRouter;
