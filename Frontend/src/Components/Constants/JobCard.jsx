import { Briefcase, ChevronRight, Clock, DollarSign, MapPin } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function JobCard({job , postAge}) {

    const navigate = useNavigate()

  return (
    <div
              key={job?._id}
              className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Hover Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Header: Icon + Titles */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors shrink-0">
                  <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {postAge}
                </span>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1" title={job.title}>
                  {job?.position}
                </h2>
                <p className="text-slate-500 font-medium text-sm">{job?.company}</p>
              </div>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" /> {job?.location}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <DollarSign className="w-4 h-4 text-slate-400" /> {job?.salary}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job?.skills?.split(',').map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-1 rounded hover:bg-slate-200 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer (Pushed to bottom) */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold 
                          ${job?.jobType === 'Full-time' ? 'bg-emerald-100 text-emerald-700' :
                    job?.jobType === 'Remote' ? 'bg-blue-100 text-blue-700' :
                      job?.jobType === 'Contract' ? 'bg-amber-100 text-amber-700' :
                        'bg-purple-100 text-purple-700'}`}>
                  {job?.jobType}
                </span>

                <button 
                onClick={() => navigate(`/job/${job?._id}` , {state : {jobData : job}})}
                className="flex items-center gap-1 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group/btn">
                  Details
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
  )
}

export default JobCard