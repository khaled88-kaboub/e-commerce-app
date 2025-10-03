import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Order = require("../models/Order");
export const getOrders = async (req, res) => {
  /* Recuperer TOUS LES TICKETS DE CAISSE de l'utilisateur
   */
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId: userId });
    res.status(200).json({
      orders: orders,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "erreur serveur",
      error: error.message,
    });
  }
};
const Cart = require("../models/Cart");
const Product = require("../models/Product");
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    const cart = await Cart.find({ userId });

    const orderItems = [];
    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.productId);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${productId} not found`,
        });
      }
      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insuffisent stock for ${product.name}. availlable : ${product.stock}. Requiested : ${cartItem.quantity}`,
        });
      }
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
      });
    }
    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });
    await cart.clearCart();
    res.status(201).json({
      success: true,
      message: "Order created successfuly",
      savedOrder: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const order = await Order.findOne({
      _id: orderId,
      userId: userId,
    });
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
