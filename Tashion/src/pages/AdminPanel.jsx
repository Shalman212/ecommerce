// src/pages/AdminPanel.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Update if your AuthContext path is different
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Extra role check (optional, PrivateRoute usually handles this)
    if (!user || user.role !== "admin") {
        navigate("/login");
        return null;
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-white border-r px-4 py-8">
                <h1 className="text-2xl font-bold mb-8 text-[#554BDA]">
                    TASHION <span className="block text-sm text-gray-500">ADMIN PANEL</span>
                </h1>
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigate("/admin/add-product")} className="p-3 border flex items-center gap-2 rounded">
                        <span>➕</span> Add Items
                    </button>
                    <button className="p-3 border flex items-center gap-2 rounded">
                        <span>☑️</span> List Items
                    </button>
                    <button className="p-3 border flex items-center gap-2 rounded">
                        <span>☑️</span> Orders
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex justify-end mb-6">
                    <button
                        className="px-6 py-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {/* Place actual content here */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Welcome, {user?.name || user?.email}
                </h2>
                <p className="text-gray-500">
                    Use the sidebar to manage products and orders.
                </p>
            </main>
        </div>
    );
};

export default AdminPanel;
