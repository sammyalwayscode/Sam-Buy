const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
mongoose.connection
  .on("open", () => {
    console.log("Database Connected");
  })
  .once("error", () => {
    console.log("Poor Database Connection");
  });

module.exports = mongoose;
