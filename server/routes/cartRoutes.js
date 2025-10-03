const express = require("express");
const cartController = require("../controllers/cartControllers");
const { auth } = require("../middlewares/authentication");

const router = express.Router();

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/:productId", auth, cartController.updateToCart);
router.delete("/:productId", auth, cartController.deleteFromCart);
router.delete("/", cartController.deleteCart);

module.exports = router;
