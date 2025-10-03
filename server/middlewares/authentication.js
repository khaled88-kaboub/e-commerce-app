import { createRequire } from "module";
const require = createRequire(import.meta.url);
const User = require("../models/User");
const jwt = require("jsonwebtoken");

export const auth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.replace("Bearer : ", "");
      console.log(token);
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to enter this route",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    console.log(req.user);
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
