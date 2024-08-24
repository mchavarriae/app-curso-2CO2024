import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasks";
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.error(error);
        }
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task);
            setTasks(tasks.map(t => t._id === id ? res.data : t));
        } catch (error) {
            console.error(error);
        }
    }

    const addSubtask = async (taskId, subtask) => {
        try {
            const res = await axios.post(`/tasks/${taskId}/subtasks`, subtask);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSubtask = async (taskId, subtaskId) => {
        try {
            const res = await axios.delete(`/tasks/${taskId}/subtasks/${subtaskId}`);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateSubtask = async (taskId, subtaskId, subtask) => {
        try {
            const res = await axios.put(`/tasks/${taskId}/subtasks/${subtaskId}`, subtask);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask,
            addSubtask,
            deleteSubtask,
            updateSubtask
        }}>
            {children}
        </TaskContext.Provider>
    );
}