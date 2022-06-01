const mongoose = require("mongoose");
const ratingModel = mongoose.Schema(
  {
    count: {
      type: Number,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ratings", ratingModel);
