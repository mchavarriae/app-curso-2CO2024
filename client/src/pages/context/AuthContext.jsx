import { createContext, useContext, useState } from "react";
import { registerRequest } from "../../api/auth"

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // el usuario que va a ser leido en toda la aplicación
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setIsAuthenticated(true);
            console.log(res.data);
            setUser(res.data);
            setErrors([]);
        } catch (error) {
            console.error(error);
            setUser(null);
            setErrors(error.response.data);
            setIsAuthenticated(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
