const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    require: true,
    type: String,
  },
  username: {
    require: true,
    type: String,
  },
  img: {
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  createdAt: {
    require: true,
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("User", userSchema);
