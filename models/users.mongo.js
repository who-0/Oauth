const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    require: true,
    type: String,
  },
  displayName: {
    require: true,
    type: String,
  },
  image: {
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
