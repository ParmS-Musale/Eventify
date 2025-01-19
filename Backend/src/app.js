const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

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
