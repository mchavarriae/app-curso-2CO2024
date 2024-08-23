import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: [true, 'Text is required']
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: [true, 'Task reference is required']
        }
    },
    {
        timestamps: true
    }
);

export default model('Comment', commentSchema);
