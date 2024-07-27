const express = require("express");
const mysql = require("mysql2/promise");
const app = express();


app.use(express.json());


//get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM tasks;");
        res.status(200).send(result);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
//create task
exports.createTask = async (req, res) => {
    const { task_name, task_description, task_status } = req.body;
    const createTask = "INSERT INTO tasks (task_name, task_description, task_status) VALUES (?, ?, ?);";
    try {
        const [insertResult] = await db.query(createTask, [task_name, task_description, task_status]);
        res.status(201).send({
            message: "Task created",
            insertResult
        });
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
//update task
exports.updateTask = async (req, res) => {
    const { task_id, task_name, task_description, task_status } = req.body;
    const updateTaskQuery = `
        UPDATE tasks 
        SET task_name = ?, task_description = ?, task_status = ? 
        WHERE id = ?;
    `;

    try {
        const [updateResult] = await db.query(updateTaskQuery, [task_name, task_description, task_status, task_id]);
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

//delete task
exports.deleteTask = async (req, res) => {
    const { task_id } = req.body;
    const deleteTaskQuery = `
        DELETE FROM tasks 
        WHERE id = ?;
    `;
    try {
        const [deleteResult] = await db.query(deleteTaskQuery, [task_id]);
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
};


