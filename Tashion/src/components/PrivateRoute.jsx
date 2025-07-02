import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// role prop: "admin", "member", or undefined for any logged-in user
const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (role && user.role !== role) {
        // Redirect if logged in, but wrong role
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
