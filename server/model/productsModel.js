const mongoose = require("mongoose");
const productsModel = mongoose.Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productsModel);
