import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-black font-sans">
            {}
            <nav className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black">
                <div className="text-white uppercase text-sm font-bold flex items-center gap-10">
                    <Link to="/" className='text-yellow-100'>Home</Link>
                    User's Dashboard
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-xs text-zinc-500 font-medium">
                        <span className="text-white uppercase">{user?.name}</span>
                    </span>
                    <button
                        onClick={logout}
                        className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded hover:bg-zinc-200 transition-colors uppercase"
                    >
                        Logout
                    </button>
                </div>
            </nav>


            <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center bg-gradient-to-br from-black via-[#051a0e] to-black animate-gradient">

                <div className="w-[720px] max-w-[90%] bg-black rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8">

                    {}
                    <div className="mb-8">
                        <h2 className="text-white text-lg font-semibold tracking-wide">Profile</h2>
                        <p className="text-gray-500 text-sm mt-1">Basic account information</p>
                    </div>

                    {}
                    <div className="divide-y divide-white/10">

                        <div className="flex items-center justify-between py-4">
                            <span className="text-gray-400 text-sm">Username</span>
                            <span className="text-white text-sm font-medium">{user?.name}</span>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <span className="text-gray-400 text-sm">Email</span>
                            <span className="text-white text-sm font-medium text-right max-w-[60%] break-all">
                                {user?.email}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <span className="text-gray-400 text-sm">Role</span>
                            <span className="text-white text-sm font-medium">{user?.role}</span>
                        </div>

                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-xs text-gray-500 mb-2">Token</p>
                        <p className="text-xs text-gray-400 break-all leading-relaxed">
                            {localStorage.getItem("token")}
                        </p>
                    </div>

                </div>

            </div>


        </div >
    );
};

export default UserDashboard;