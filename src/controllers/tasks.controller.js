import Task from "../models/task.model.js"
import Comment from "../models/comment.model.js";


export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const { title, description, date, comments } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        comments,
        user: req.user.id
    });

    const savedTask = await newTask.save();
    res.json(savedTask);

};

/*export const getCommentsByTaskId = async (req, res) => {
    try {
        const comments = await Comment.find({ taskId: req.params.id });
        if (!comments) return res.status(404).json({ message: "Comments not found!" });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
};*/

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
};

