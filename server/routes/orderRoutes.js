const express = require("express");
const orderController = require("../controllers/orderControllers");
const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);

module.exports = router;
