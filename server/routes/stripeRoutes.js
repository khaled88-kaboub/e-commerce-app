const express = require("express");

const router = express.Router();

router.post("/create-payment-intent");
router.post("/webhook");

module.exports = router;
