const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

module.exports = router;
