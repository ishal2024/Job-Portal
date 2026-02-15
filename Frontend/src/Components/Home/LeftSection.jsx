import React, { useState } from 'react';
import { Search, Filter, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LeftSection() {

  const [jobQuery , setJobQuery] = useState("")
  const navigate = useNavigate()

  function handleOnSearchQuery(){
    if(jobQuery.length > 0)
     navigate(`/search?query=${jobQuery}`)
  }

  const [filters, setFilters] = useState({
    jobType: { all: true, fullTime: false, contract: false, internship: false, remote: false },
    freshness: 'past_24h'
  });

  const handleCheckboxChange = (key) => {
    setFilters(prev => ({
      ...prev,
      jobType: { ...prev.jobType, [key]: !prev.jobType[key] }
    }));
  };

  return (
    <aside className="w-full lg:w-1/4">
      <div className="lg:sticky lg:top-24 space-y-6">

        {/* Search Box */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" /> Search
          </h3>
          <div className="relative">
            <input
              type="text"
              value={jobQuery}
              onKeyDown={(e) => e.key == "Enter" && handleOnSearchQuery()}
              onChange={(e) => setJobQuery(e.target.value)}
              placeholder="Job title or company name..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
          onClick={handleOnSearchQuery}
           className="w-full mt-3 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            <div className='flex items-center gap-2 justify-center'>
              <SearchIcon /> Search
            </div>
          </button>
        </div>

        {/* Filters */}
        {/* <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold">Filters</h3>
          </div>

          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Job Type</h4>
            <div className="space-y-3">
              {[
                { id: 'all', label: 'All' },
                { id: 'fullTime', label: 'Full-time' },
                { id: 'contract', label: 'Contract' },
                { id: 'internship', label: 'Internship' },
                { id: 'remote', label: 'Remote' },
              ].map((type) => (
                <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.jobType[type.id]}
                      onChange={() => handleCheckboxChange(type.id)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-indigo-600 checked:border-indigo-600 transition-all"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Freshness</h4>
            <div className="space-y-3">
              {[
                { id: 'last_12h', label: 'Last 12 hours' },
                { id: 'past_24h', label: 'Past 1 day' },
                { id: 'past_7d', label: 'Past 7 days' },
              ].map((radio) => (
                <label key={radio.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="freshness"
                    checked={filters.freshness === radio.id}
                    onChange={() => setFilters({ ...filters, freshness: radio.id })}
                    className="h-5 w-5 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">{radio.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  )
}

export default LeftSection