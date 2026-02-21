import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignupForm = () => {
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User", // Default role
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const success = await signup(formData.name, formData.email, formData.password, formData.role);
            if (!success) {
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full ">
            <div className="w-full max-w-lg  border border-zinc-600  p-8  rounded space-y-6 text-white backdrop-blur-md bg-opacity-80">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-semibold text-white italic ">
                        Create Account
                    </h2>
                    <p className="text-zinc-400 text-sm italic">Join us today!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500  transition-all duration-200 focus:border-green-500 focus:outline-none disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="email@gmail.com"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500  transition-all duration-200 focus:border-green-500 focus:outline-none disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500  transition-all duration-200 focus:border-green-500 focus:outline-none disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white focus:outline-none  transition-all duration-200 focus:border-green-500 disabled:opacity-50"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-green-800 hover:bg-green-700 text-white font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-700 font-medium hover:text-white hover:underline transition-colors">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
