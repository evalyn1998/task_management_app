const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

const mac_db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "interview",
  })
  
  mac_db.connect((err) => {
    if (err) {
      console.log("Error connecting to Db")
      throw err
    }
    console.log("Connection established")
  })
  
  global.mac_db = mac_db
  
  app.listen(8000, () => {
    console.log("Running on port 8000")
  })