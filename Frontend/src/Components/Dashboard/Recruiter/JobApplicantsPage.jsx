import React, { useEffect, useState } from 'react';
import {
    ArrowLeft,
    Eye,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    XCircle,
    Clock,
    Mail,
    Calendar
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { applicationCandidates, updateApplicationStatus } from '../../../axios/applicationApi';
import { RotatingLines } from 'react-loader-spinner';

const JobApplicantsPage = () => {
    // Mock Data with UNIQUE IDs
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    // State to track which dropdown is currently open (by ID)
    const [activeDropdownId, setActiveDropdownId] = useState(null);

    // Toggle Dropdown Logic
    const toggleDropdown = (id) => {
        if (activeDropdownId === id) {
            setActiveDropdownId(null); // Close if already open
        } else {
            setActiveDropdownId(id); // Open the clicked one
        }
    };

    // Handle Status Change
    async function handleStatusChange(applicationId, status) {
        try {
            setIsLoading(true)
            const res = await updateApplicationStatus(applicationId, { status: status })
            if (res?.data?.status) {
                const filtered = candidates.filter((app) => app?._id !== applicationId);

                setCandidates([res?.data?.data, ...filtered]);
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error?.message)
            setIsLoading(false)
        }
    }

    async function handleInitialApplicantsData() {
        try {
            const res = await applicationCandidates(location?.state?.jobId)
            if (res?.data?.status) {
                setCandidates(res?.data?.data)
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    // Helper for Status Badge Styles
    const getStatusBadge = (status) => {
        console.log(status)
        switch (status) {
            case 'Shortlisted':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Shortlisted
                    </span>
                );
            case 'Rejected':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <Clock className="w-3.5 h-3.5" /> Applied
                    </span>
                );
        }
    };

    useEffect(() => {
        handleInitialApplicantsData()
    }, [])



    return (
        <div className="bg-slate-50 font-sans text-slate-800 p-6 mb-20 min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto">

                {/* --- 1. Top Navigation --- */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-4 group w-fit">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-slate-900">Applicants: {location?.state?.jobData?.position}</h1>
                        <p className="text-slate-500 mt-2 flex items-center gap-2">
                            Reviewing <span className="font-semibold text-slate-900">{candidates.length} candidates</span> for this position.
                        </p>
                    </div>
                </header>

                {/* --- 2. Applicants Table Card --- */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Table */}
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="px-6 py-4">Candidate</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Applied On</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {candidates.map((candidate) => (
                                    <tr
                                        key={candidate.id}
                                        className="hover:bg-indigo-50/30 transition-colors group relative"
                                    >
                                        {/* Candidate Column */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-orange-100 text-orange-700`}>
                                                    {candidate?.userId?.username?.split(" ").map(name => name[0]?.toUpperCase())?.join("")}
                                                </div>
                                                <span className="font-semibold text-slate-900">{candidate?.userId?.username}</span>
                                            </div>
                                        </td>

                                        {/* Contact Column */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                {candidate?.userId?.email}
                                            </div>
                                        </td>

                                        {/* Applied On Column */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(candidate?.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                            </div>
                                        </td>

                                        {/* Status Column */}
                                        <td className="px-6 py-4">
                                            {getStatusBadge(candidate?.status)}
                                        </td>

                                        {/* Actions Column */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 relative">

                                                {/* Status Dropdown Trigger */}
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleDropdown(candidate?._id);
                                                        }}
                                                        className={`flex items-center gap-1 cursor-pointer text-sm font-medium hover:text-indigo-600 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-indigo-100
                              ${activeDropdownId === candidate?._id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 bg-slate-100'}`}
                                                    >
                                                        <span>Change Status</span>
                                                        {activeDropdownId === candidate?._id ?
                                                            <ChevronUp className="w-4 h-4" /> :
                                                            <ChevronDown className="w-4 h-4" />
                                                        }
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {activeDropdownId === candidate?._id && (
                                                        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                            <button
                                                                onClick={() => handleStatusChange(candidate?._id, "Applied")}
                                                                disabled = {isLoading}
                                                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-slate-400"></span> Applied
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(candidate?._id, "Shortlisted")}
                                                                disabled = {isLoading}
                                                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Shortlist
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(candidate?._id, "Rejected")}
                                                                disabled = {isLoading}
                                                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors"
                                                            >
                                                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* View Profile Button */}
                                                <button
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                    title="View Profile"
                                                >
                                                    {isLoading &&
                                                        <RotatingLines
                                                            visible={true}
                                                            height="25"
                                                            width="25"
                                                            color="grey"
                                                            strokeWidth="5"
                                                            animationDuration="0.75"
                                                            ariaLabel="rotating-lines-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />
                                                    }
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicantsPage;