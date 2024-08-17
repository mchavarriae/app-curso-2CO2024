import { Router } from "express";
import { getProject, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = Router();

router.get('/projects', getProject);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);


export default router;