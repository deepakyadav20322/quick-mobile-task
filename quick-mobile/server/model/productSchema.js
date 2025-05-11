const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    variant: { type: String, required: true },
    rating: { type: String, default: "0" },
    reviews: { type: String, default: "0" },
    price: { type: String, required: true },
    oldPrice: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
