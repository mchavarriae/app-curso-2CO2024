import Task from "../models/task.model.js";

export const getTasks = async(req, res) =>{
    const tasks = await Task.find({user: req.user.id}).populate('user');
    res.json(tasks);
};

export const createTask = async(req, res) =>{
    const {title, description, date} = req.body;

    const newTask  = new Task({
        title, description, date, user: req.user.id
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
};

export const getTask = async(req, res) =>{};

export const updateTask = async(req, res) =>{};

export const deleteTask = async(req, res) =>{};
