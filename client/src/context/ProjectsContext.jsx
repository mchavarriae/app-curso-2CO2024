import { createContext, useContext, useState } from "react";
import { createProjectRequest, deleteProjectRequest, getProjectRequest, updateProjectRequest, getProjectsRequest } from "../api/project";

const ProjectContext = createContext();

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}

export function ProjectProvider({ children }) {
    const [Projects, setProjects] = useState([]);

    const createProject = async (project) => {
        try {
            const res = await createProjectRequest(project);
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    const getProjects = async () => {
        try {
            const res = await getProjectsRequest();
            console.log(res);
            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProject = async (id) => {
        try {
            const res = await deleteProjectRequest(id);
            if (res.status === 204) setProjects(Projects.filter((project) => project._id !== id));

        }
        catch (error) {
            console.error(error);
        }
    }

    const getProject = async (id) => {
        try {
            const res = await getProjectRequest(id);
            console.log(res);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateProject = async (id, project) => {
        try {
            const res = await updateProjectRequest(id, project);
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    return (<ProjectContext.Provider value={{
        Projects,
        createProject,
        getProjects,
        deleteProject,
        getProject,
        updateProject
    }}>
        {children}
    </ProjectContext.Provider>)
}