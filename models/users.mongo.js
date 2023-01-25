const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    require: true,
    type: String,
  },
  username: {
    require: true,
    type: String,
  },
  image: {
    type: String,
    default: "/img/user.png",
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    require: true,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
