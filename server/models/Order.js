const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "product name is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
});

const shippingAddressScehma = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street name required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    items: {
      type: [orderItemSchema],
      required: [true, "Order items are required"],
      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },
        message: " Order must have at least 1 Item",
      },
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Confirmed", "Shipped", "Delivered"],
        message:
          " Status must be one of: Pending, Confirmed, Shipped, Delivered",
      },
      default: "Pending",
    },
    shippingAddress: {
      type: shippingAddressScehma,
      required: [true, "Shipping address is required"],
    },
  },
  { timestamps: true }
);

/*
Definir les fonctions suivantes avec schema.methods :
 -updateStatus ==== permet de changer le status de la commande en cours
 -calculateTotal === calcul le prix total de la commande
 -addItem === ajouter un nouvel element a la commande
 - removeItem === retirer un element de la commande
 -
*/
orderSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  return this.save();
};
orderSchema.methods.calculateTotal = function () {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  });
  return this.totalAmount;
};
orderSchema.methods.addItem = function (item) {
  this.items.push(item);
  this.calculateTotal();
  return this.save();
};
orderSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );
};
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
