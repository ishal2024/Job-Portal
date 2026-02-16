import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, DollarSign, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { fetchHomeJobs } from '../../axios/jobsApi';
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentPage, addHomeJobs } from '../../Store/homeSlicer';
import JobCard from '../Constants/JobCard';
import HomePageSkeleton from '../Constants/HomePageSkeleton';

// const JOBS = [
//   {
//     id: 1,
//     title: 'Senior Frontend Engineer',
//     company: 'TechFlow Systems',
//     location: 'San Francisco, CA',
//     salary: '$120k - $150k',
//     type: 'Full-time',
//     posted: '2h ago',
//     tags: ['React', 'Tailwind', 'TS']
//   },
//   {
//     id: 2,
//     title: 'Product Designer',
//     company: 'Creative Solutions',
//     location: 'Remote',
//     salary: '$90k - $115k',
//     type: 'Contract',
//     posted: '5h ago',
//     tags: ['Figma', 'UX/UI']
//   },
//   {
//     id: 3,
//     title: 'Backend Developer',
//     company: 'DataStream Inc.',
//     location: 'Austin, TX',
//     salary: '$130k - $160k',
//     type: 'Full-time',
//     posted: '1d ago',
//     tags: ['Node', 'PostgreSQL']
//   },
//   {
//     id: 4,
//     title: 'Marketing Intern',
//     company: 'Growth Rocket',
//     location: 'New York, NY',
//     salary: '$25k - $35k',
//     type: 'Internship',
//     posted: '1d ago',
//     tags: ['SEO', 'Content']
//   },
//   {
//     id: 5,
//     title: 'DevOps Engineer',
//     company: 'CloudScale',
//     location: 'Remote',
//     salary: '$140k - $170k',
//     type: 'Full-time',
//     posted: '2d ago',
//     tags: ['Docker', 'K8s']
//   },
//   {
//     id: 6,
//     title: 'React Native Dev',
//     company: 'MobileFirst',
//     location: 'Chicago, IL',
//     salary: '$110k - $135k',
//     type: 'Contract',
//     posted: '3d ago',
//     tags: ['Mobile', 'iOS']
//   }
// ];

function RightSection() {

  const dispatch = useDispatch()
  const { homeJobsData , totalPages , currPage } = useSelector((state) => state?.home)
  const [isSkeletonLoading , setSkeletonLoading] = useState(false)

  async function handleFetchHomeJobs(pageNum = 1) {
    try {
      setSkeletonLoading(true)
      const prevPageNum = currPage
      dispatch(addCurrentPage(pageNum))
      const res = await fetchHomeJobs(pageNum, 1)
      if (res?.data?.status) {
        dispatch(addHomeJobs({data : res?.data?.data , totalPages : res?.data?.totalPages , currPage : res?.data?.page}))
        console.log("Home data fetching again ")
        setSkeletonLoading(false)
      }
      else{
        dispatch(addCurrentPage(prevPageNum))
        setSkeletonLoading(false)
      }
    } catch (error) {
      setSkeletonLoading(false)
      console.log(error?.message)
    }
  }

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

  function handleOnPageChange(pageNum){
      handleFetchHomeJobs(pageNum)
  }


  useEffect(() => {
    if(homeJobsData.length == 0)
    handleFetchHomeJobs()
  }, [])

  return (
    <>
{   isSkeletonLoading ?
     <HomePageSkeleton />
  :
   <section className="flex-1 w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Recommended Jobs</h1>
          <p className="text-slate-500 mt-1">Found {homeJobsData?.length} open positions.</p>
        </div>
      </div>

      {/* --- GRID LAYOUT CHANGE --- */}
      {/* sm: 1 col, md: 2 cols, lg: 3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeJobsData.map((job) => {
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

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
          onClick={() => handleOnPageChange(i+1)}
          className={`${currPage == i+1 ? "bg-indigo-600" : "bg-gray-400"} w-10 h-10 flex items-center justify-center rounded-lg  text-white font-medium shadow-md transition-all`}>
            {i + 1}
          </button>
        ))}

        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>}
    </>
  )
}

export default RightSection