import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import { ProjectProvider } from "./context/ProjectsContext";
import Navbar from "./components/Navbar";
import ProjectPage from "./pages/ProjectPage";
import ProjectFormPage from "./pages/ProjectFormPage";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ProjectProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />}></Route>
                  <Route path="/add-task" element={<TaskFormPage />}></Route>
                  <Route path="/tasks/:id" element={<TaskFormPage />}></Route>
                  <Route path="/profile" element={<ProfilePage />}></Route>
                  <Route path="/projects" element={<ProjectPage />}></Route>
                  <Route path="/projects/:id" element={<ProjectFormPage />}></Route>
                  <Route path="/add-projects" element={<ProjectFormPage />}></Route>
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </ProjectProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
