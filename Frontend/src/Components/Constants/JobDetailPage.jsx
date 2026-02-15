import React, { useEffect, useState } from 'react';
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Users,
    Calendar,
    CheckCircle,
    ArrowRight,
    Monitor,
    Globe,
    Zap,
    ChevronLeft
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchSpecificJob } from '../../axios/jobsApi';
import { createApplication } from '../../axios/applicationApi';
import { RotatingLines } from 'react-loader-spinner';

const JobDetailPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [jobData, setJobData] = useState({})
    const [alreadyApplied, setAlreadyApplied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // const jobData = location?.state?.jobData

    const { jobId } = useParams()

    async function fetchJobData() {
        try {
            const res = await fetchSpecificJob(jobId)
            if (res?.data?.status) {
                setJobData(res?.data?.data?.job)
                setAlreadyApplied(res?.data?.data?.alreadyApplied)
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    async function handleApplyNow() {
        try {
            setIsLoading(true)
            const res = await createApplication(jobId)
            if (res?.data?.status) {
                fetchJobData()
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error?.message)
        }
    }

    useEffect(() => {
        fetchJobData()
    }, [])


    return (
        <div className="min-h-screen md:w-[70%] m-auto bg-slate-50 font-sans text-slate-800 pb-12">

            {/* --- Navigation / Breadcrumb (Visual Context) --- */}
            <nav className="  sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                        <ChevronLeft className="w-4 h-4" /> Back to Jobs
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- 1. Top Section: Job Header Card --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                        {/* Left: Info */}
                        <div className="flex items-start gap-5">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                                <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" strokeWidth={1.5} />
                            </div>

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{jobData?.position}</h1>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm md:text-base">
                                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                                        <Globe className="w-4 h-4 text-indigo-500" /> {jobData?.company}
                                    </span>
                                    <span className="hidden sm:inline text-slate-300">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" /> {jobData?.location}
                                    </span>
                                    <span className="hidden sm:inline text-slate-300">•</span>
                                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                                        {jobData?.jobType}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Action */}
                        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                            <button
                                disabled={alreadyApplied}
                                onClick={handleApplyNow}
                                className={`flex justify-center items-center w-full md:w-auto ${alreadyApplied ? 'bg-indigo-400 hover:bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-700'}  text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2`}>
                                {alreadyApplied ? "Already Applied" :
                                <>
                                        {isLoading ?
                                            <RotatingLines
                                                visible={true}
                                                height="25"
                                                width="25"
                                                color="white"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                            :
                                            <>
                                            Apply Now
                                        <ArrowRight className="w-5 h-5" />
                                        </>
                                        }
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Left Column: Details --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* --- 2. Applicants Info (NEW) --- */}
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-center gap-4 animate-fade-in-up">
                            <div className="bg-white p-2.5 rounded-lg shadow-sm">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-medium">Total Applicants</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-slate-900">{jobData?.applicants}</span>
                                    <span className="text-xs text-slate-400">people applied </span>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-indigo-${i * 100 + 200} flex items-center justify-center text-[10px] font-bold text-white`}>
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                                        +21
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-indigo-600" />
                                Job Description
                            </h2>
                            <div className="text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    {jobData?.description}
                                </p>

                            </div>
                        </section>

                        {/* Required Skills */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-indigo-600" />
                                Required Skills
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {jobData?.skills?.split(',').map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg font-medium text-sm border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* --- Right Column: Sidebar --- */}
                    <div className="space-y-6">

                        {/* Job Overview Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-900">Job Overview</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 gap-6">

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Posted Date</p>
                                        <p className="font-medium text-slate-900">{new Date(jobData?.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}</p>
                                    </div>
                                </div>

                                {/* <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Expiration</p>
                    <p className="font-medium text-slate-900">12 Mar, 2026</p>
                  </div>
                </div> */}

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Location</p>
                                        <p className="font-medium text-slate-900">{jobData?.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">Salary Range</p>
                                        <p className="font-medium text-slate-900">{jobData?.salary}</p>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>

                </div>
            </main>
        </div>
    );
};

export default JobDetailPage;