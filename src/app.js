const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const product_router = require("./routes/product_router");
const order_router = require("./routes/order_router");
const auth_router = require("./routes/auth_router");
const upload_router = require("./routes/upload_router");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", product_router);
app.use("/order", order_router);
app.use("/auth", auth_router);
app.use("/uploads", upload_router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
