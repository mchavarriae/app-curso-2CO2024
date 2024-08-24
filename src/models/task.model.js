import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        subtasks: [subtaskSchema] // Añadimos el array de subtareas
    }, 
    { timestamps: true }
);

export default mongoose.model('Task', taskSchema);