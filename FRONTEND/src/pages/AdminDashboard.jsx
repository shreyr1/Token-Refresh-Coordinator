import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <nav className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent italic tracking-wider">
                    Admin Dashboard
                </h1>
                <div className="flex items-center gap-6">
                    <span className="text-zinc-400 text-sm font-medium tracking-wide">
                        Welcome, <span className="text-green-400">{user?.name}</span> (Admin)
                    </span>
                    <button
                        onClick={logout}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded border border-zinc-700 hover:border-green-500/50 transition-all duration-300 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 p-6 rounded border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all cursor-pointer group duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-green-400 transition-colors">User Management</h3>
                    <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Manage all registered users.</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all cursor-pointer group duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-green-400 transition-colors">System Settings</h3>
                    <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Configure application settings.</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded border border-zinc-800 hover:border-green-500/50 hover:bg-zinc-900 transition-all cursor-pointer group duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-green-400 transition-colors">Analytics</h3>
                    <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors">View system performance.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
