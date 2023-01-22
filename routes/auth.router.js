const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  return res.render("login");
});

authRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

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
authRouter.get("/error", (req, res) => {
  res.send("something wrong");
});

module.exports = authRouter;
