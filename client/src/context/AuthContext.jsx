import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyRequest } from "../api/auth";
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookie.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            // Mostrar un mensaje al usuario indicando que debe verificar su correo
            setErrors(["Please check your email to verify your account."]);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const signin = async (credentials) => {
        try {
            const res = await loginRequest(credentials);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            setUser(null);
            setIsAuthenticated(false);
            console.error(error);
        }
    };

    const logout = () => {
        Cookie.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            loading,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
};
