const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/dbConnect");

const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const auth = require("./routes/userRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subCategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/banner", bannerRoutes);

app.use("/api/register", auth.login);
app.use("/api/login", auth.register);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
