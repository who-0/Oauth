require("dotenv").config({ path: "./config/.env" });
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { PORT } = process.env;
const { mongoConnect } = require("./config/mongodb");

(async () => {
  await mongoConnect();
  server.listen(PORT, (_) => {
    console.log(`Server is running on PORT:${PORT}`);
  });
})();
