const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { COOKIE_KEY_1, COOKIE_KEY_R } = process.env;
const {
  findUserWithEmail,
  addUser,
  findUserId,
} = require("../models/users.model");

const httpGetLogin = (req, res) => res.render("login", { message: null });

const httpGetSignup = (req, res) => res.render("signup", { message: null });

//! Google ---------------
const httpGoogleCallback = (req, res) => res.redirect("/");

//! Github -------------------------
const httpGithubCallback = (req, res) => res.redirect("/");

//! User account ------------------------------
//? Signup user--------------------------------
const httpUserSignup = async (req, res) => {
  const user = req.body;
  if (!user) {
    res.render("signup", { message: "Please Try again." });
  } else if (!user.uname || !user.pwd || !user.email) {
    res.render("signup", { message: "Missing Some input. Please all fill." });
  } else {
    const e_user = await findUserWithEmail(user.email);
    if (e_user) {
      res.render("signup", { message: "Your already signup. Please Login " });
    } else {
      try {
        const hashPassword = await bcrypt.hash(user.pwd, 8);
        const newId = (await findUserId()) + 1; //? -------User id----
        const newUser = {
          userId: newId,
          username: user.uname,
          email: user.email,
          password: hashPassword,
        };
        const c_user = await addUser(newUser);
        if (!c_user) {
          res.render("signup", { message: "Please Signup again." });
        } else {
          const accessToken = jwt.sign(
            { id: c_user.id, email: user.email },
            COOKIE_KEY_1,
            {
              expiresIn: "1d",
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
        res.render("error", {
          message: "Plase Try again later. Our system is missing something.",
        });
      }
    }
  }
};

//? Login user--------------------------------
const httpUserLogin = async (req, res) => {
  const { email, pwd } = req.body;
  const foundUser = await findUserWithEmail(email);
  if (!foundUser) {
    res.render("login", {
      message: "Your account doesn't found in our system.",
    });
  } else if (!foundUser.password) {
    res.render("login", { message: "You must choice correct login way!" });
  } else {
    try {
      const solvepwd = await bcrypt.compare(pwd, foundUser.password);
      if (solvepwd) {
        const accessToken = jwt.sign(
          { id: foundUser.id, email },
          COOKIE_KEY_1,
          {
            expiresIn: "1d",
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
        res.render("login", { message: "Your password is incorrect" });
      }
    } catch (error) {
      console.error(error);
      res.render("error", {
        message: "Plase Try again later. Our system is missing something.",
      });
    }
  }
};

//? refresh router ------------------------
const httpRefresh = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.render("error", { message: "Please Login again" });
  } else {
    try {
      jwt.verify(refreshToken, COOKIE_KEY_R, (error, result) => {
        if (error) {
          res.render("error", {
            message: "Missing something. Please login again",
          });
        } else {
          const accessToken = jwt.sign(result, COOKIE_KEY_1, {
            expiresIn: "24h",
          });
          const refreshToken = jwt.sign(result, COOKIE_KEY_R);
          res.cookie("accessToken", accessToken, { httpOnly: true });
          res.cookie("refreshToken", refreshToken, { httpOnly: true });
          res.redirect("/");
        }
      });
    } catch (error) {
      console.error(error);
      res.render("error", {
        message: "Plase Try again later. Our system is missing something.",
      });
    }
  }
};

//!----------------------------------------------------------------------

const httpError = (req, res) => res.render("error", { message: "No Error" });

const httpLogout = (req, res) =>
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.render("login", { message: null });
  });

//!module-------------

module.exports = {
  httpGetLogin,
  httpGetSignup,
  httpGoogleCallback,
  httpGithubCallback,
  httpUserSignup,
  httpUserLogin,
  httpRefresh,
  httpError,
  httpLogout,
};
