import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jwt = require("jsonwebtoken");
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
  });
};
