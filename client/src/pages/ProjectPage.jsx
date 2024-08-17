import { useEffect } from "react";
import { useProject } from "../context/ProjectsContext";
import ProjectCard from "../components/ProjectCard";


function ProjectPage(){
    const {getProjects, Projects} = useProject();
    useEffect(()=>{
        getProjects();
    }, [])

    return (
        <div className="grid grid-cols-3 gap-2">
            {
                Projects.map(project => (
                   <ProjectCard project={project} key={project._id}></ProjectCard>
                ))
            }
        </div>
    )
}
export default ProjectPage;