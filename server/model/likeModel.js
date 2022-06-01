const mongoose = require("mongoose");
const likeModel = mongoose.Schema(
  {
    isLiked: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
