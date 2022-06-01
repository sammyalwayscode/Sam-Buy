const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },

    isVerify: {
      type: Boolean,
    },
    OTP: {
      type: String,
    },
    mainOTP: {
      type: String,
    },
    verifiedToken: {
      type: String,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
