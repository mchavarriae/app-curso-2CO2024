import Task from "../models/task.model.js"


export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });

    const savedTask = await newTask.save();
    res.json(savedTask);

};

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

export const addSubtask = async (req, res) => {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.subtasks.push({ title, description });
    await task.save();
    res.json(task);
};

export const deleteSubtask = async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.subtasks.id(req.params.subtaskId).remove();
    await task.save();
    res.json(task);
};


export const updateSubtask = async (req, res) => {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    subtask.title = title || subtask.title;
    subtask.description = description || subtask.description;

    await task.save();
    res.json(task);
};