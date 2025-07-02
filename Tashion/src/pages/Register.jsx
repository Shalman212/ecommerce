import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save user data, send to backend, etc.
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            navigate("/login"); // Redirect to login after registration
        }, 2000);
        setForm({ name: "", email: "", password: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Register for Tashion</h2>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="mb-4 w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mb-4 w-full px-4 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="mb-6 w-full px-4 py-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition font-semibold"
                >
                    Register
                </button>
                {submitted && (
                    <div className="text-green-600 font-semibold text-center mt-3">
                        Registration successful! Redirecting to login...
                    </div>
                )}
                <div className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <span
                        className="text-black font-semibold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Register;
