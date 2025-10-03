const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product ID is required"],
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity must be at least 1"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
  return this.save();
};
cartSchema.methods.clearCart = function () {
  this.items = [];
  return this.save();
};
cartSchema.methods.getTotalItems = function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

cartSchema.methods.addItem = function (productId, quantity) {
  const itemExists = this.items.find(
    (item) => item.productId.toString() === productId.toString()
  );
  if (itemExists) {
    itemExists += 1;
  } else {
    this.items.push({ productId, quantity });
  }
  return this.save();
};

cartSchema.methods.updateItemQuantity = (productId, quantity) => {
  const item = this.items.find(
    (item) => item.productId.toString() === productId.toString()
  );
  if (item) {
    return this.removeItem(productId);
  } else {
    item.quantity = quantity;
    return this.save();
  }
  return this;
};
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
