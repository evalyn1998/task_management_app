const express = require("express");
const mysql = require("mysql2/promise");
const app = express();


app.use(express.json());

// Get all tasks
exports.getAllTasks = async (req, res) => {
    const { user_id } = req.body; // Assuming user_id is provided as a query parameter
    if (!user_id) {
        return res.status(400).send({ error: "user_id is required" });
    }

    try {
        const [result] = await db.query("SELECT * FROM tasks WHERE user_id = ?;", [user_id]);
        res.status(200).send(result);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Create task
exports.createTask = async (req, res) => {
    const { task_name, task_description, task_status, user_id } = req.body;
    if (!user_id) {
        return res.status(400).send({ error: "user_id is required" });
    }

    const createTaskQuery = "INSERT INTO tasks (task_name, task_description, task_status, user_id) VALUES (?, ?, ?, ?);";
    try {
        const [insertResult] = await db.query(createTaskQuery, [task_name, task_description, task_status, user_id]);
        res.status(201).send({
            message: "Task created",
            insertResult
        });
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    const { id, task_name, task_description, task_status } = req.body;
    if (!id) {
        return res.status(400).send({ error: "id is required" });
    }

    const updateTaskQuery = `
        UPDATE tasks 
        SET task_name = ?, task_description = ?, task_status = ? 
        WHERE id = ?;
    `;

    try {
        const [updateResult] = await db.query(updateTaskQuery, [task_name, task_description, task_status, id]);
        if (updateResult.affectedRows === 0) {
            res.status(404).send({ message: "Task not found" });
        } else {
            res.status(200).send({
                message: "Task updated",
                updateResult
            });
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).send({ error: "id is required" });
    }

    const deleteTaskQuery = `
        DELETE FROM tasks 
        WHERE id = ?;
    `;
    try {
        const [deleteResult] = await db.query(deleteTaskQuery, [id]);
        if (deleteResult.affectedRows === 0) {
            res.status(404).send({ message: "Task not found" });
        } else {
            res.status(200).send({
                message: "Task deleted",
                deleteResult
            });
        }
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
}