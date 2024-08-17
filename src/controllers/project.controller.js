import project from '../models/project.model.js';

export const getProject = async (req, res) => {
    const projects = await project.find();
    res.json(projects);
};

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newProject = new project({
            name, description
        });
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (error) {
        console.error(error);
        res.json(error);
    }

};

export const updateProject = async (req, res) => {
    try {
        const projects = await project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!projects) return res.status(404).json({ message: "Project not found" });
        return res.json(projects);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projects = await project.findByIdAndDelete(req.params.id);
        if (!projects) return res.status(404).json({ message: "Project not found!" });
 
        return res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
 
};