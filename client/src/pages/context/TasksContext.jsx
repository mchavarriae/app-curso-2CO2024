import {createContext, useContext, useState} from "react";
import { createTaskRequest } from "../../api/tasks";

const TaskContext = createContext();

export const useTasks = () =>{
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTasks must be used withina TaskProvider");
    }
    return context;
}

export function TaskProvider({children}){
    const [tasks, setTasks] = useState([]);

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            console.log(res);
        }catch(errr){
            console.error();
        }
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask
        }}>
            {children}
        </TaskContext.Provider>
    )
};