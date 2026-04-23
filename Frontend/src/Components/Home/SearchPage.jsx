import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchJobs } from '../../axios/jobsApi'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import JobCard from '../Constants/JobCard'
import LeftSection from './LeftSection'
import HomePageSkeleton from '../Constants/HomePageSkeleton'
import { useSelector } from 'react-redux'

function SearchPage() {

    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [searchData, setSearchData] = useState({ data: [], totalPages: 1 })
    const [searchParams] = useSearchParams()
    const [isSkeletonLoading, setSkeletonLoading] = useState(true)
    const navigate = useNavigate()

    const { jobType, freshness } = useSelector((state) => state.filter)

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
        // if (currentPageNumber < 1) return
        // if (currentPageNumber > searchData?.totalPages) return
        try {
            setSkeletonLoading(true)
            if (!searchParams.has("query") || searchParams.get("query").length == 0) return
            const query = searchParams.get("query")
            const res = await searchJobs(query, currentPageNumber, 1, { jobType, freshness })
            if (res?.data?.status) {
                setSearchData({ data: res?.data?.data, totalPages: res?.data?.totalPages })
                setSkeletonLoading(false)
            }
        } catch (error) {
            console.log(error?.message)
            setSkeletonLoading(false)
        }
    }

    useEffect(() => {
        handleSearchData()
    }, [currentPageNumber, searchParams, jobType, freshness])

    console.log(searchData)

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <LeftSection />
                    {
                        isSkeletonLoading ?
                            <HomePageSkeleton />
                            :
                            <section className="flex-1 w-full">
                                <nav className="  sticky top-0 z-40">
                                    <div className="max-w-7xl mx-auto flex items-center mb-2">
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                                            <ChevronLeft className="w-4 h-4" /> Back to Home
                                        </button>
                                    </div>
                                </nav>
                                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-slate-900">{searchParams.get("query")} Jobs</h1>
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
                                <div className="mt-12 flex items-center justify-center gap-4">

                                    {/* Prev Button */}
                                    <button
                                        onClick={() => {
                                            setCurrentPageNumber((prev) => {
                                                if (prev - 1 < 1)
                                                    return prev
                                                else
                                                    return prev - 1
                                            })
                                        }}
                                        className={`px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50 flex items-center gap-2`}>
                                        <ChevronLeft className="w-5 h-5" />
                                        Prev
                                    </button>

                                    {/* Page Indicator */}
                                    <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md">
                                        {currentPageNumber} / {searchData?.totalPages}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => {
                                            setCurrentPageNumber((prev) => {
                                                if (prev + 1 > searchData?.totalPages)
                                                    return prev
                                                else
                                                    return prev + 1
                                            })
                                        }}
                                        className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                </div>
                            </section>}
                </div>
            </main>
        </>
    )
}

export default SearchPage