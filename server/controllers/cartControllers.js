import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Cart = require("../models/Cart");
const Product = require("../models/Product");
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      cart: {
        id: cart._id,
        userId: cart.userId,
        items: cart.items,
        totalItems: cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalAmount: cart.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error, couldnt get cart",
      error: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  try {
    console.log("entering add to cart");

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res
        .status(400)
        .json({ succes: false, message: "product Id is Required" });
    }
    const userId = req.user.id;

    console.log(userId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const itemExists = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );
    if (itemExists) {
      return res.status(400).json({
        success: false,
        message: "Product ALREADY in Cart",
      });
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart: {
        id: cart._id,
        userId: cart.userId,
        items: cart.items,
        totalItems,
      },
      totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
      totalAmount: cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });
  } catch (error) {}
};
export const updateToCart = async (req, res) => {};
export const deleteFromCart = async (req, res) => {};
export const deleteCart = async (req, res) => {};
