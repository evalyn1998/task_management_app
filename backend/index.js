const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Using mysql2 for promise support
const cookieParser = require("cookie-parser");
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB connection
db.getConnection()
  .then(() => console.log("Database connection established"))
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });

  global.db = db;
// API Routes
const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
