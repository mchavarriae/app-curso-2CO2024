import { Link } from "react-router-dom";
import { useProject } from "../context/ProjectsContext";

function ProjectCard ({project}){
    const {deleteProject} = useProject();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md" >
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <div className="flex gap-x-2 items-center" >
                    <button onClick={()=>{
                        deleteProject(project._id);
                    }}> Delete </button>
                    <Link to={`/projects/${project._id}`}> Edit</Link>
                </div>
            </header>
            <p className="text-slate-300">{project.description}</p>
        </div>
    )
}

export default ProjectCard;