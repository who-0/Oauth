const Users = require("./users.mongo");

const findUser = async (googleId) => await Users.findOne({ googleId });

const addUser = async (newUser) =>
  await Users.findOneAndUpdate({ googleId: newUser.googleId }, newUser, {
    upsert: true,
    new: true,
  });

const findById = async (id) => {
  return await Users.findById(id);
};
module.exports = {
  findUser,
  addUser,
  findById,
};

