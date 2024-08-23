import Comment from '../models/comment.model.js';
import Task from '../models/task.model.js';


//creacion del comentario
export const createComment = async (req, res) => {
    const { text } = req.body;
    const taskId = req.params.taskId;

    try {
        const newComment = await Comment.create({ text, task: taskId });
        await Task.findByIdAndUpdate(taskId, { $push: { comments: newComment._id } }, { new: true });

        return res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};

//actualizar comentarios
export const updateComment = async (req, res) => {
    const { text } = req.body;
    const commentId = req.params.commentId;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({ message: "Failed to update comment" });
    }
};

//borrar comentarios
export const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await Task.findByIdAndUpdate(deletedComment.task, { $pull: { comments: commentId } }, { new: true });

        return res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ message: "Failed to delete comment" });
    }
};