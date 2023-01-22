const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/auth/login");
  }
};

module.exports = checkLogin;
