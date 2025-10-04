const express = require("express");
const dotenv = require("dotenv");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const connectDB = require("./config/database");

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(
  cors({
    origin: "https://ecommerce88.netlify.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);

const PORT = process.env.PORT || 4400;

app.listen(PORT, (error) => {
  console.log("listening on port ", PORT);
});
