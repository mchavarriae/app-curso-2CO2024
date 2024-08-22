import { useForm } from "react-hook-form";
import { useProject } from "../context/ProjectsContext";
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect } from "react";


function ProjectFormPage(){
    const {register, handleSubmit, setValue} = useForm();
    const {createProject, getProjects, updateProject} = useProject();
    const navigate = useNavigate();
    const params = useParams();
    const onSubmit = handleSubmit(async(data)=> {
        if(params.id){
           await updateProject(params.id, data);
        }else{
            await createProject(data);
        }
        navigate("/projects");
    });

    useEffect(()=>{
        async function loadProject(){
            if(params.id){
                const project = await getProjects(params.id);
                setValue('name', project.title);
                setValue('description', project.description)
            }
        }
        loadProject();

    }, [])

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Name" {...register("name")} autoFocus></input>
                <textarea rows="3" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  placeholder="Description" {...register("description")}></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}
export default ProjectFormPage;