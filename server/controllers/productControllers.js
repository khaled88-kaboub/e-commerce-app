import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Product = require("../models/Product");
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }
    //ca cest un systeme de pagination
    const skip = (Number(page) - 1) * Number(limit);
    const limitNum = Number(limit);

    const products = await Product.find(filter).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      products: products,
      page: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
