// src/pages/MemberPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MemberPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Extra role check (PrivateRoute already handles it, but this is double safety)
    if (!user || user.role !== "member") {
        navigate("/login");
        return null;
    }

    return (
        <div className="flex flex-col items-center mt-16 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-3">
                Welcome, {user.name || user.email}!
            </h1>
            <p className="text-gray-600 mb-8">
                This is your member dashboard. Here you can view your orders, update your profile, or shop more!
            </p>
            <div className="flex gap-4">
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded shadow"
                    onClick={() => navigate("/orders")}
                >
                    My Orders
                </button>
                <button
                    className="px-6 py-2 bg-green-500 text-white rounded shadow"
                    onClick={() => navigate("/cart")}
                >
                    Go to Cart
                </button>
                <button
                    className="px-6 py-2 bg-gray-500 text-white rounded shadow"
                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
            {/* Add more member features here if you want */}
        </div>
    );
};

export default MemberPage;
