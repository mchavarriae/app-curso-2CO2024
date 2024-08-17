import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim:true,
            unique: true
        },

        description: {
            type: String,
            require: false,
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model("project", projectSchema);