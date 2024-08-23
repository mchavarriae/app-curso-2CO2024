import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getTask, updateTask, deleteTask, createTask } from "../controllers/tasks.controller.js";
import commentRoutes from '../comentarios/comment.routes.js';  // Importar las rutas de comentarios

const router = Router();

router.use('/tasks', authRequired, commentRoutes); // Usar las rutas de comentarios como subrutas de /tasks

router.get('/tasks', authRequired,getTasks);
router.get('/tasks/:id', authRequired,getTask);
router.post('/tasks', authRequired,createTask);
router.delete('/tasks/:id', authRequired,deleteTask);
router.put('/tasks/:id', authRequired,updateTask);


export default router;