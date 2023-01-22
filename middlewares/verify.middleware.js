const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  } else {
    return res.redirect("/auth/login");
  }
};

module.exports = checkLogin;
