import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./pages/context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>       
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/tasks" element={<h1>Tasks List</h1>}></Route>
          <Route path="/add-task" element={<h1>Add Task</h1>}></Route>
          <Route path="/task/:id" element={<h1>Get Task</h1>}></Route>
          <Route path="/profile" element={<h1>Profile</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>)
}
export default App;