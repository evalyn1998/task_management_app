const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Using mysql2 for promise support
const cookieParser = require("cookie-parser");
require('dotenv').config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Create a MySQL connection pool
let db;
(async () => {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log("Connection established to the database.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

// Example route
app.get("/", async (req, res) => {
  try {
    res.json({ message: "Hello" });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

module.exports = { db }; // Exporting the db for use in other modules if needed
