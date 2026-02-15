import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Plus,
  Building2,
  Briefcase,
  Edit2,
  Trash2,
  Users,
  ArrowRight,
  MoreHorizontal,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import PostJobPage from './PostJobPage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobPost } from '../../../axios/jobsApi';
import { addDashboardDetail } from '../../../Store/userSlicer';
import { recruiterDashboard } from '../../../axios/dashboardApi';


const RecruiterHub = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('jobs');
  const [jobStatus, setJobStatus] = useState('active');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postJobPage, setPostJobPage] = useState(false)
  const [updateJobData , setUpdateJobPost] = useState(null)

  const { userDashboardData } = useSelector((state) => state?.user)
  console.log(userDashboardData)

  async function handleDeleteJobPost(postId) {
    try {
      console.log(postId)
      const res = await deleteJobPost(postId)
      if (res?.data?.status) {
        const dashboardData = await recruiterDashboard()
        if (dashboardData?.data?.status)
          dispatch(addDashboardDetail(dashboardData?.data?.data))
      }
    } catch (error) {
      console.log(error?.message)
    }
  }

  function handleUpdateJobPost(data){
    console.log(data)
    setUpdateJobPost(data)
    setPostJobPage(true)
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
        ${activeTab === id
          ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
      <div className={`transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`}>
        <Icon size={20} />
      </div>
      <span className="relative z-10">{label}</span>
      {activeTab === id && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden flex flex-col md:flex-row">

      {postJobPage && <PostJobPage updateJobData = {updateJobData} onClose={() => setPostJobPage(false)} />}

      

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200 flex flex-col p-6 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="mb-10 hidden md:block px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Briefcase size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Recruit<span className="text-blue-600">Hub</span></h1>
              <span className="text-xs text-slate-400 font-medium">HR Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 flex-1">
          <NavItem id="jobs" icon={LayoutGrid} label="My Posted Jobs" />
          <NavItem id="post" icon={Plus} label="Post New Job" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">

        {/* Top Header Section */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-slate-500 text-sm md:text-base flex items-center gap-2">
              Welcome back, verify your new applicants.
            </p>
          </div>

          <div className="flex items-center gap-4">

            <button onClick={() => {
              setUpdateJobPost(null)
              setPostJobPage(true)
              }} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 transform hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto">
              <Plus size={20} />
              <span>Post New Job</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {/* <button className="px-5 py-2.5 bg-white rounded-full border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95">
            Active Jobs <span className="ml-2 px-2 py-0.5 bg-slate-100 rounded-full text-xs text-slate-500">6</span>
          </button> */}
          <button
          onClick={() => setJobStatus('active')} 
          className={`${jobStatus == 'active' ?
            "px-5 py-2.5 bg-white rounded-full border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
           :'px-5 py-2.5 bg-transparent rounded-full border border-transparent text-sm font-medium text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm cursor-pointer whitespace-nowrap transition-all'}`}>
            Active Jobs 
          </button>
          <button 
          onClick={() => setJobStatus('closed')}
          className={`${jobStatus == 'closed' ?
            "px-5 py-2.5 bg-white rounded-full border border-slate-200 text-sm font-semibold text-slate-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95"
           :'px-5 py-2.5 bg-transparent rounded-full border border-transparent text-sm font-medium text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm cursor-pointer whitespace-nowrap transition-all'}`}>
            Closed Jobs 
          </button>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {userDashboardData.map((job, index) => {

            if(jobStatus == "active" && job?.status == false) return
            if(jobStatus == "closed" && job?.status == true) return

            return (
            <div
              key={job.id}
              className={`
                group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm 
                hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 ease-out
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  {/* Job Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300`}>
                    <Briefcase color='blue' size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {job?.position}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 text-sm text-slate-500 mt-1.5">
                      <span className="flex items-center gap-1">
                        <Building2 size={14} />
                        {job?.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                        {job?.jobType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Right Actions */}
                <div className="relative">
                  {/* <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors md:hidden">
                    <MoreHorizontal size={20} />
                  </button> */}
                  <div 
                  className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <button 
                    onClick={() => handleUpdateJobPost(job)}
                    className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Job">
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteJobPost(job?._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Job">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body / Stats */}
              <div className="flex items-end justify-between mt-8 pt-6 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Applicants</span>
                  <div className="flex items-center gap-3">

                    <div className="flex items-baseline gap-1.5 ml-2">
                      <span className="text-2xl font-bold text-slate-900">{job.applicants}</span>
                    </div>
                  </div>
                </div>

                <button 
                onClick={() => navigate('/dashboard/applicants' , {state : {jobId : job?._id , jobData : job}})}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 text-sm font-semibold rounded-xl transition-all duration-300 group/btn">
                  <Users size={16} />
                  <span>Candidates</span>
                  <ArrowRight size={14} className="opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                </button>
              </div>
            </div>
          )})}

          {/* Create New Job Empty State Card */}
          <button className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-600 transition-all duration-300 min-h-[240px] group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors shadow-sm">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <span className="block font-bold text-lg mb-1">Create New Job</span>
              <span className="text-sm text-slate-400 font-normal">Post a new opening to find talent</span>
            </div>
          </button>
        </div>
      </main>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default RecruiterHub;