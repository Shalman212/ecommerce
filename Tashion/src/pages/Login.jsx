import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Demo users for login (replace with backend/users db for real app)
const dummyUsers = [
  { email: "admin@tashion.com", password: "admin123", role: "admin" },
  { email: "user@tashion.com", password: "user123", role: "member" },
];

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (user) {
      login(user); // Save user info to context
      setError("");
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login to Tashion</h2>
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
          Login
        </button>
        {error && (
          <div className="text-red-600 font-semibold text-center mt-3">{error}</div>
        )}
        <div className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            className="text-black font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
