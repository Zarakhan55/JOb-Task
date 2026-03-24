import express from "express";

const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const newTask = {
        id: id++,
        text,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});