const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const jobCategoryRoutes = require("./routes/jobCategoryRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

const app = express();

// CORS FIX 
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobCategoryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/applications", applicationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API berjalan dengan baik!");
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
