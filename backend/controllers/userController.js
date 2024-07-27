const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

//get all user
exports.getAllUsers = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM users;");
        res.status(200).send(result);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
//create user
exports.createUser = async (req, res) => {
    const { user_email, user_password } = req.body;
    const hashedPassword = bcrypt.hashSync(user_password); // default salt 10 

    const checkIfUserExist = "SELECT * FROM users WHERE email = ?;";
    const createUser = "INSERT INTO users (email, password) VALUES (?, ?);";

    try {
        const [searchResult] = await db.query(checkIfUserExist, [user_email]);
        if (searchResult.length > 0) {
            res.status(400).send({ message: "User already exists" });
        } else {
            const [insertResult] = await db.query(createUser, [user_email, hashedPassword]);
            res.status(201).send({
                message: "Registered into the database",
                insertResult
            });
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
//authenticate user 
exports.authenticateUser = async (req, res) => {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
        return res.status(400).send({ error: "Email and password are required" });
    }
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?;", [user_email]);
        if (rows.length === 0) {
            return res.status(401).send({ error: "Authentication failed. User not found." });
        }
        const user = rows[0];
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = bcrypt.compareSync(user_password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: "Authentication failed. Wrong password." });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET
        );
        res.status(200).send({ message: "Authentication successful", token });
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};


