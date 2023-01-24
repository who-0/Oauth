const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { COOKIE_KEY_1, COOKIE_KEY_R } = process.env;
const {
  findUserWithEmail,
  addUser,
  findUserId,
} = require("../models/users.model");

const httpGetLogin = (req, res) => {
  res.render("login");
};

const httpGetSignup = (req, res) => {
  res.render("signup");
};

//! Google ---------------
const httpGoogleCallback = (req, res) => {
  return res.redirect("/");
};

//! Github -------------------------
const httpGithubCallback = (req, res) => {
  return res.redirect("/");
};

//! User account ------------------------------
const httpUserSignup = async (req, res) => {
  const user = req.body;
  console.log("user", user);
  if (!user) {
    res.redirect("/error");
    console.log("user error");
  } else if (!user.uname || !user.pwd || !user.email) {
    console.log("input error");
    res.redirect("/error");
  } else {
    const e_user = await findUserWithEmail(user.email);
    if (e_user) {
      console.log("euser error");
      res.redirect("/error");
    } else {
      const hashPassword = await bcrypt.hash(user.pwd, 8);
      console.log("hashpassowr", hashPassword);
      const newId = (await findUserId()) + 1;
      console.log("newId", newId);
      const newUser = {
        userId: newId,
        username: user.uname,
        email: user.email,
        password: hashPassword,
      };
      console.log("newuser", newUser);
      const c_user = await addUser(newUser);
      console.log("c_user", c_user);
      const accessToken = jwt.sign(
        { id: c_user.id, email: user.email },
        COOKIE_KEY_1,
        {
          expiresIn: "1m",
        }
      );
      const refreshToken = jwt.sign(
        { id: c_user.id, email: user.email },
        COOKIE_KEY_R
      );
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.redirect("/");
    }
  }
};

const httpUserLogin = (req, res) => {
  const user = req.body;

  return res.status(200).json(user);
};

const httpError = (req, res) => {
  res.send("something wrong");
};

const httpLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.render("login");
  });
};

module.exports = {
  httpGetLogin,
  httpGetSignup,
  httpGoogleCallback,
  httpGithubCallback,
  httpUserSignup,
  httpUserLogin,
  httpError,
  httpLogout,
};
