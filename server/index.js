const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const app = express();
require("./config/db");
const usersRoute = require("./router/userRouter");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server Up");
});

app.use("/api", usersRoute);

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
