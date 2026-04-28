const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

/* -----------------------------
   Middleware
----------------------------- */
app.use(cors());
app.use(express.json());

/* -----------------------------
   MongoDB Connection
----------------------------- */
mongoose
  .connect("mongodb://mokshada23:mokshal1023@ac-xamcnec-shard-00-00.wopsglz.mongodb.net:27017,ac-xamcnec-shard-00-01.wopsglz.mongodb.net:27017,ac-xamcnec-shard-00-02.wopsglz.mongodb.net:27017/?ssl=true&replicaSet=atlas-3cxlo7-shard-0&authSource=admin&appName=Cluster0")
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

/* -----------------------------
   Test Route
----------------------------- */
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

/* -----------------------------
   API Routes
----------------------------- */
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

/* -----------------------------
   Start Server
----------------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});