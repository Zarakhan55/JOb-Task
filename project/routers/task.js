import express from "express";
const router = express.Router();

let tasks = [];
let id = 1;



//  GET ALL TASKS + FILTER

router.get("/",(req,res)=>{
    const {completed} = req.query;
    if(completed !==undefined){
        const filtered =tasks.filter(task => task.completed === (completed === "true"));
        return res.json(filtered);
    }
    res.json(tasks);
});


// GET SINGLE TASK
router.get("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

// ✅ CREATE TASK
router.post("/", (req, res) => {
    const { text } = req.body;

    // 🚨 Validation
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Task text is required" });
    }

    const newTask = {
        id: id++,
        text,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// ✅ UPDATE TASK (PUT)
router.put("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { text, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    // 🚨 Validation
    if (text !== undefined && text.trim() === "") {
        return res.status(400).json({ error: "Task text is required" });
    }

    // Update fields
    if (text !== undefined) task.text = text;
    if (completed !== undefined) task.completed = completed;

    res.json({ message: "Task updated", task });
});

// ✅ DELETE TASK
router.delete("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(index, 1);

    res.json({ message: "Task deleted" });
});

export default router;