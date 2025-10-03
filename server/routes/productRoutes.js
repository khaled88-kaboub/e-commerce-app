const express = require("express");
const productController = require("../controllers/productControllers");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/categories", productController.getCategories);
router.get("/:id", productController.getProductById);

module.exports = router;
