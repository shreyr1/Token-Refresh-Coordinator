import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const success = await login(formData.email, formData.password);
            if (!success) {
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full px-6">
            <div className="w-full max-w-md  shadow-xl border border-zinc-800 rounded p-8 space-y-6 text-white backdrop-blur-sm bg-opacity-80">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-white italic">
                        Welcome Back
                    </h2>
                    <p className="text-zinc-400 text-sm italic">Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500  transition-all duration-200 focus:border-sky-500 focus:outline-none disabled:opacity-50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium text-zinc-300">Password</label>
                            <a href="#" className="text-purple-400 hover:text-purple-300 text-xs transition-colors">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500  transition-all duration-200 focus:border-sky-500 focus:outline-none disabled:opacity-50"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded bg-sky-700 font-bold hover:bg-sky-900 transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition-colors">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
