const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http:localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // Specify allowed methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  })
);
app.options("*", cors()); // Enable preflight requests for all routes
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Add this middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this middleware to parse URL-encoded bodies

// Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const eventRoutes = require("./routes/event");
const adminRoutes = require("./routes/admin");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", eventRoutes);
app.use("/", adminRoutes);

// Database connection
connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  })
  .catch((error) => {
    console.log("Database cannot be connected", error);
  });
