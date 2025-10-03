const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "Composants PC",
          "Moniteurs",
          "Accessoires gaming",
          "Jeux et loisirs",
          "Ordinateur Portable",
        ],
      },
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true }
);

productSchema.methods.updateStock = function (quantity) {
  this.stock += quantity;
  return this.save();
};

productSchema.methods.isInStock = function () {
  return this.stock > 0;
};

productSchema.statics.findInPriceRange = function (minPrice, maxPrice) {
  return this.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
};
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
