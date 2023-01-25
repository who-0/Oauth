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
//? Signup user--------------------------------
const httpUserSignup = async (req, res) => {
  const user = req.body;
  if (!user) {
    res.redirect("/error");
  } else if (!user.uname || !user.pwd || !user.email) {
    res.redirect("/error");
  } else {
    const e_user = await findUserWithEmail(user.email);
    if (e_user) {
      res.redirect("/error");
    } else {
      try {
        const hashPassword = await bcrypt.hash(user.pwd, 8);
        const newId = (await findUserId()) + 1;
        const newUser = {
          userId: newId,
          username: user.uname,
          email: user.email,
          password: hashPassword,
        };
        const c_user = await addUser(newUser);
        if (!c_user) {
          res.redirect("/error");
        } else {
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
      } catch (error) {
        console.error(error);
        res.redirect("/error");
      }
    }
  }
};

//? Login user--------------------------------
const httpUserLogin = async (req, res) => {
  const { email, pwd } = req.body;
  const foundUser = await findUserWithEmail(email);
  if (!foundUser) {
    res.redirect("/error");
  } else if (foundUser.password === "oauth") {
    res.redirect("/");
  } else {
    try {
      const solvepwd = bcrypt.compare(pwd, foundUser.password);
      if (solvepwd) {
        const accessToken = jwt.sign(
          { id: foundUser.id, email },
          COOKIE_KEY_1,
          {
            expiresIn: "1m",
          }
        );
        const refreshToken = jwt.sign(
          { id: foundUser.id, email },
          COOKIE_KEY_R
        );
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.redirect("/");
      } else {
        res.redirect("/error");
      }
    } catch (error) {
      console.error(error);
      res.redirect("/error");
    }
  }
};

//!----------------------------------------------------------------------

const httpError = (req, res) => {
  res.send("something wrong");
};

const httpLogout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
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
