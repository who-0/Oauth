const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (req.isAuthenticated() || accessToken) {
    if (accessToken) {
      jwt.verify(accessToken, process.env.COOKIE_KEY_1, (err, data) => {
        if (err) {
          if (err.message === "jwt expired") {
            res.redirect("/auth/refresh");
          } else {
            res.redirect("/error");
          }
        } else {
          req.data = data;
          return next();
        }
      });
    } else {
      return next();
    }
  } else {
    return res.redirect("/auth/login");
  }
};

module.exports = checkLogin;
