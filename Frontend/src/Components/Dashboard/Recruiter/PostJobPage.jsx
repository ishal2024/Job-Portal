import { useEffect, useState } from "react";
import {  
  Building2, 
  Briefcase,  
  X, 
  ArrowRight,
  MapPin,
  DollarSign,
  FileText,
  Tags,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { createJobPost, updateJobPost } from "../../../axios/jobsApi";
import { recruiterDashboard } from "../../../axios/dashboardApi";
import { useDispatch } from "react-redux";
import { addDashboardDetail } from "../../../Store/userSlicer";
import { RotatingLines } from "react-loader-spinner";

const PostJobPage = ({ updateJobData , onClose }) => {

  const dispatch = useDispatch()
  const [isLoading , setIsLoading] = useState(false)

  console.log(updateJobData)

  const [jobStatus, setJobStatus] = useState(updateJobData?.status == false ? 'Closed' : 'Open');
  const [position , setPosition] = useState(updateJobData ? updateJobData?.position : "")
  const [location , setLocation] = useState(updateJobData ? updateJobData?.location : "")
  const [company , setCompany] = useState(updateJobData ? updateJobData?.company : "")
  const [jobType , setJobType] = useState(updateJobData ? updateJobData?.jobType : "")
  const [salary , setSalary] = useState(updateJobData ? updateJobData?.salary : "")
  const [description , setDescription] = useState(updateJobData ? updateJobData?.description : "")
  const [skills , setSkills] = useState(updateJobData ? updateJobData?.skills : "")

  async function handleCreateJob(){
    try {
      setIsLoading(true)
      const data = {
         position,
         location,
         company,
         jobType,
         salary,
         description,
         skills,
         status : jobStatus == 'Open' ? true : false
      }
      const res = await createJobPost(data)
      if(res?.data?.status){
        const dashboardData = await recruiterDashboard()
        if(dashboardData?.data?.status)
          dispatch(addDashboardDetail(dashboardData?.data?.data))
        onClose()
        setIsLoading(false)
      }
      // console.log(res.data.)
    } catch (error) {
      setIsLoading(false)
      console.log(error?.response)
    }
  }

  async function handleUpdateJobPost(){
    try {
      if(!updateJobData) return

      setIsLoading(true)

      const data = {
         position,
         location,
         company,
         jobType,
         salary,
         description,
         skills,
         status : jobStatus == 'Open' ? true : false
      }

      const res = await updateJobPost(data , updateJobData?._id)
      if(res?.data?.status){
        const dashboardData = await recruiterDashboard()
        if(dashboardData?.data?.status)
          dispatch(addDashboardDetail(dashboardData?.data?.data))
        onClose()
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error?.response)
    }
  }

  const isFormDisabled = !(position && location && jobStatus && jobType && salary && description && skills && company)

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 `}>
      
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div 
        className={`
          relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] 
          transform transition-all duration-300 ease-out scale-100
          
        `}
      >
        
        {/* Sticky Header */}
        <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white rounded-t-2xl z-20">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Post New Job</h2>
            <p className="text-sm text-slate-500">Create a new listing to find the perfect candidate.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <form className="space-y-6">
            
            {/* Title & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Job Title <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Briefcase size={18} />
                  </div>
                  <input
                  onChange={(e) => setPosition(e?.target?.value)}
                  value={position}
                   type="text" placeholder="e.g. Senior Backend Engineer" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Company Name</label>
                <div className="relative group">
                  <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Building2 size={18} />
                  </div>
                  <input 
                  onChange={(e) => setCompany(e?.target?.value)}
                  value={company}
                  type="text" placeholder="Your Company Name" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>

            {/* Location & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Location</label>
                <div className="relative group">
                  <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <input 
                  onChange={(e) => setLocation(e?.target?.value)}
                  value={location}
                  type="text" placeholder="e.g. New York, NY" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Job Type</label>
                <div className="relative">
                  <select
                  onChange={(e) => setJobType(e.target.value)} 
                  value={jobType} 
                  className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white">
                    <option>Full-Time</option>
                    <option>Remote</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Salary & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Salary Range</label>
                <div className="relative group">
                  <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <DollarSign size={18} />
                  </div>
                  <input 
                  onChange={(e) => setSalary(e?.target?.value)}
                  value={salary}
                  type="text" placeholder="e.g. $100k – $150k" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {['Open', 'Closed'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setJobStatus(status)}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-md transition-all ${jobStatus === status ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {status === 'Open' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FileText size={18} />
                </div>
                <textarea 
                onChange={(e) => setDescription(e?.target?.value)}
                value={description}
                rows={5} placeholder="Describe the role responsibilities..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all"></textarea>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Skills</label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Tags size={18} />
                </div>
                <input 
                onChange={(e) => setSkills(e?.target?.value)}
                  value={skills}
                type="text" placeholder="React, Node.js, AWS" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <div className="flex-none px-6 py-5 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-white hover:border-slate-300 transition-all"
          >
            Cancel
          </button>
          {updateJobData ? 
          <button 
          onClick={handleUpdateJobPost}
          className={`px-6 py-2.5 rounded-xl 
          bg-green-600 hover:bg-green-700
           text-white text-sm font-semibold shadow-lg shadow-blue-600/20  hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2`}>
            {isLoading ? <RotatingLines
              visible={true}
              height="25"
              width="25"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : "Update Job"}
            <ArrowRight size={16} />
          </button>
          :
          <button 
          onClick={handleCreateJob}
          disabled = {isFormDisabled}
          className={`px-6 py-2.5 rounded-xl 
          ${isFormDisabled ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} 
           text-white text-sm font-semibold shadow-lg shadow-blue-600/20  hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2`}>
            {isLoading ? <RotatingLines
              visible={true}
              height="25"
              width="25"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : "Publish Job"}
            <ArrowRight size={16} />
          </button>}
        </div>

      </div>
    </div>
  );
};

export default PostJobPage