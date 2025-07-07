// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Export the context so you can use it in useContext() anywhere
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    // Try to load from localStorage for persistence
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    // Login: save both user and token, and persist them
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    // Logout: remove user/token from state and storage
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Keep state and storage in sync
    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        }
    }, [user, token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy context access (optional, but recommended)
export const useAuth = () => useContext(AuthContext);
