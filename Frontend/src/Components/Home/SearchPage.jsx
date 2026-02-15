import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchJobs } from '../../axios/jobsApi'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import JobCard from '../Constants/JobCard'
import LeftSection from './LeftSection'

function SearchPage() {

    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [searchData, setSearchData] = useState({ data: [], totalPages: 1 })
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // if(searchParams.get('query').length == 0 || !searchParams.has('query')){
    //     navigate('/')
    // }

    function getPostAge(createdAt) {
        const now = new Date();
        const created = new Date(createdAt);

        const diffMs = now - created; // milliseconds

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return `${seconds}s ago`;
    }

    async function handleSearchData() {
        try {
            if (!searchParams.has("query") || searchParams.get("query").length == 0) return
            const query = searchParams.get("query")
            const res = await searchJobs(query, currentPageNumber, 1)
            if(res?.data?.status) {
               setSearchData({data : res?.data?.data , totalPages : res?.data?.totalPages})  
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
         handleSearchData()
    },[currentPageNumber , searchParams])

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <LeftSection />
                    <section className="flex-1 w-full">
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Recommended Jobs</h1>
                                <p className="text-slate-500 mt-1">Found {searchData?.data?.length} open positions.</p>
                            </div>
                        </div>

                        {/* --- GRID LAYOUT CHANGE --- */}
                        {/* sm: 1 col, md: 2 cols, lg: 3 cols */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchData?.data?.map((job) => {
                                const postAge = getPostAge(job?.createdAt)
                                return (
                                    <JobCard job={job} postAge={postAge} />
                                )
                            })}
                        </div>

                        {/* --- PAGINATION --- */}
                        <div className="mt-12 flex items-center justify-center gap-2">
                            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50">
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {Array.from({ length: searchData?.totalPages }).map((_, i) => (
                                <button
                                    onClick={() => setCurrentPageNumber(i + 1)}
                                    className={`${currentPageNumber == i + 1 ? "bg-indigo-600" : "bg-gray-400"} w-10 h-10 flex items-center justify-center rounded-lg  text-white font-medium shadow-md transition-all`}>
                                    {i + 1}
                                </button>
                            ))}

                            <button 

                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default SearchPage