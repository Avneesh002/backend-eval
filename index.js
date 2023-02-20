const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./configs/db");
const { userRoute } = require("./users.route");
const { postRoute } = require("./posts.route");
const { authentication } = require("./middleware/authentication.middleware");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "API is working fine" });
});

app.use("/users", userRoute);

app.use(authentication);
app.use("/posts", postRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB is running");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on ${process.env.PORT} port`);
});
