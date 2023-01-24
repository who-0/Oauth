const Users = require("./users.mongo");
const default_user = 0;

const findUser = async (userId) => await Users.findOne({ userId });

const findUserWithEmail = async (email) => await Users.findOne({ email });

const addUser = async (newUser) =>
  await Users.findOneAndUpdate({ userId: newUser.userId }, newUser, {
    upsert: true,
    new: true,
  });

const findById = async (id) => {
  return await Users.findById(id, { _id: 0, __v: 0 });
};

const findUserId = async () => {
  const lastestId = await Users.find({});
  if (!lastestId) {
    return default_user;
  } else {
    return lastestId.length;
  }
};
module.exports = {
  findUser,
  addUser,
  findById,
  findUserId,
  findUserWithEmail,
};
