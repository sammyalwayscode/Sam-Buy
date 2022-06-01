const cloudinery = require("cloudinary").v2;

cloudinery.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: "871341554644239",
  api_secret: process.env.API_SECRET,
  secure: true,
});

module.exports = cloudinery;
