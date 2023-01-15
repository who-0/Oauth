const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

mongoose.set("strictQuery", true);
mongoose.connection.once("open", () => {
  console.log("Mongodb is connected");
});

mongoose.connection.on("error", () => {
  console.log(error);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const mongoDisconnect = () => {
  mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
