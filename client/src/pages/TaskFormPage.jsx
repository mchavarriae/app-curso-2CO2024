import { useForm } from "react-hook-form";
import { useTasks } from "./context/TasksContext";

function TaskFormPage() {
    const { register, handleSubmit } = useForm();
    const {createTask} = useTasks();
    const onSubmit = handleSubmit((values) => {
        // console.log(values);
        createTask(values);

    });
    return (
        <div className="bg-zinc-800 max-w-md w-full rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Title" {...register("title")} autoFocus ></input>
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Description" {...register("description")}></textarea>
                <button> Save</button>
            </form>
        </div>

    );
};

export default TaskFormPage;

