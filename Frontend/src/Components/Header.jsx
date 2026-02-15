import React, { useState } from 'react'
import { Search, Briefcase, Menu, X, LayoutDashboard, ChevronDown, User, LogOut, Link } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../axios/authApi';
import { removeUserData } from '../Store/userSlicer';

function Header() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen , setIsProfileOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { status, userData } = useSelector((state) => state?.user)

    console.log(userData)

    async function handleLogOut(){
        try {
            await logOutUser()
            navigate('/')
            dispatch(removeUserData())

        } catch (error) {
            console.log(error?.message)
        }
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-15 ">
                            {/* Logo */}
                            <div
                                onClick={() => navigate('/')}
                                className="flex items-center gap-2 cursor-pointer group">
                                <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                    JobHunt
                                </span>
                            </div>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center gap-8">
                                <NavLink to={'/'} className="text-slate-600 font-medium hover:text-indigo-600 transition-colors flex items-center gap-2">
                                    <Search className="w-4 h-4" /> Find Jobs
                                </NavLink>
                                {status && <NavLink to={'/dashboard'} className="text-slate-600 font-medium hover:text-indigo-600 transition-colors flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </NavLink>}
                            </nav>
                        </div>

                        {/* Right Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {status ?
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{userData?.username}</span>
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-xs text-gray-400">Role</p>
                                                <p className="text-sm font-semibold capitalize text-gray-700">{userData?.role}</p>
                                            </div>
                                            <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs text-gray-400">Profile</p>

                                            <button
                                            onClick={handleLogOut}
                                                className="w-full text-left py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                :
                                <>
                                    <button
                                        onClick={() => navigate('/signin')}
                                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                        Sign Up
                                    </button>
                                </>
                            }
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-slate-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg absolute w-full">
                        <a href="#" className="block text-slate-600 font-medium">Find Jobs</a>
                        <a href="#" className="block text-slate-600 font-medium">Dashboard</a>
                        <hr className="border-slate-100" />
                       {status ?
                       <button className="block w-full bg-red-600 text-white px-5 py-2 rounded-lg font-medium">Log Out</button>
                       : 
                       <>
                        <button className="block w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium">Sign In</button>
                        <button className="block w-full bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium">Sign Up</button>
                        </>
                       }
                    </div>
                )}
            </header>
        </>
    )
}

export default Header