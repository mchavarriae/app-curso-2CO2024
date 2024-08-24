import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function TaskFormPage() {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();
    const [subtasks, setSubtasks] = useState([]);

    const onSubmit = handleSubmit(async (data) => {
        data.subtasks = subtasks;
        if (params.id) {
            await updateTask(params.id, data);
        } else {
            await createTask(data);
        }
        navigate("/tasks");
    });

    const addSubtask = () => {
        const title = getValues('subtaskTitle');
        const description = getValues('subtaskDescription');
        if (title && description) {
            setSubtasks([...subtasks, { title, description }]);
            setValue('subtaskTitle', '');
            setValue('subtaskDescription', '');
        }
    };

    const removeSubtask = (index) => {
        const newSubtasks = [...subtasks];
        newSubtasks.splice(index, 1);
        setSubtasks(newSubtasks);
    };

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                setValue('title', task.title);
                setValue('description', task.description);
                setSubtasks(task.subtasks || []);
            }
        }
        loadTask();
    }, [params.id, setValue, getTask]);

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Title" {...register("title")} autoFocus />
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Description" {...register("description")} />
                
                <div className="mt-4">
                    <h4 className="text-white">Subtasks:</h4>
                    {subtasks.map((subtask, index) => (
                        <div key={index} className="flex items-center justify-between bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                            <div>
                                <p>{subtask.title}</p>
                                <p className="text-sm">{subtask.description}</p>
                            </div>
                            <button type="button" className="text-red-500" onClick={() => removeSubtask(index)}>Remove</button>
                        </div>
                    ))}
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Subtask Title" {...register("subtaskTitle")} />
                    <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Subtask Description" {...register("subtaskDescription")} />
                    <button type="button" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2" onClick={addSubtask}>Add Subtask</button>
                </div>

                <button className="w-full bg-green-500 text-white px-4 py-2 rounded-md my-2">Save</button>
            </form>
        </div>
    );
}
export default TaskFormPage;