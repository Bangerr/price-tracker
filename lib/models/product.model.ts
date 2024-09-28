import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
    unique: true,
  },
  currency: { type: String, require: true },
  title: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: String, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
