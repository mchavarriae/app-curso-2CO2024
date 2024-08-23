import { Router } from 'express';
import { createComment, updateComment, deleteComment } from '../comentarios/comment.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// POST /api/tasks/:taskId/comments
router.post('/tasks/:taskId/comments', authRequired, createComment);

// PUT /api/comments/:commentId
router.put('/comments/:commentId', authRequired, updateComment);

// DELETE /api/comments/:commentId
router.delete('/comments/:commentId', authRequired, deleteComment);

export default router;