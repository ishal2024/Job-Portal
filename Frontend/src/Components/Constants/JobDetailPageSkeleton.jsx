import React from 'react';

const JobDetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
      
      {/* --- Navigation / Breadcrumb Skeleton --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center animate-pulse">
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 1. Top Header Skeleton --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 relative overflow-hidden animate-pulse">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Left: Info */}
            <div className="flex items-start gap-5 w-full md:w-2/3">
              {/* Icon Placeholder */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 rounded-xl shrink-0"></div>
              
              <div className="flex-1 space-y-3 pt-1">
                {/* Title */}
                <div className="h-6 md:h-8 bg-slate-200 rounded-lg w-3/4"></div>
                
                {/* Meta Data Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="h-4 w-32 bg-slate-100 rounded"></div>
                  <div className="hidden sm:block h-1.5 w-1.5 bg-slate-200 rounded-full"></div>
                  <div className="h-4 w-40 bg-slate-100 rounded"></div>
                  <div className="hidden sm:block h-1.5 w-1.5 bg-slate-200 rounded-full"></div>
                  {/* Badge */}
                  <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right: Action Button */}
            <div className="w-full md:w-auto mt-2 md:mt-0">
              <div className="h-12 w-full md:w-40 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* --- 2. Main Content Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* --- Left Column: Details --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Applicants Info Bar Skeleton */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 bg-slate-100 rounded"></div>
                <div className="h-5 w-48 bg-slate-200 rounded"></div>
              </div>
            </div>

            {/* Description Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-pulse">
              {/* Section Heading */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded"></div>
                <div className="h-6 w-40 bg-slate-200 rounded"></div>
              </div>
              
              {/* Paragraph Lines */}
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              </div>
            </section>

            {/* Responsibilities Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-pulse">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded"></div>
                <div className="h-6 w-48 bg-slate-200 rounded"></div>
              </div>
              
              {/* Bullet List */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 mt-2 bg-slate-300 rounded-full shrink-0"></div>
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-pulse">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-slate-200 rounded"></div>
                <div className="h-6 w-32 bg-slate-200 rounded"></div>
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 w-24 bg-slate-100 rounded-lg border border-slate-50"></div>
                ))}
              </div>
            </section>
          </div>

          {/* --- Right Column: Sidebar --- */}
          <div className="space-y-6">
            
            {/* Overview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-pulse">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="h-5 w-28 bg-slate-200 rounded"></div>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6">
                
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                    <div className="space-y-2 w-full pt-1">
                      <div className="h-3 w-20 bg-slate-100 rounded"></div>
                      <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-slate-100 rounded-2xl shadow-sm p-6 text-center animate-pulse h-48 flex flex-col justify-center items-center">
              <div className="h-5 w-3/4 bg-slate-200 rounded mb-3"></div>
              <div className="h-3 w-1/2 bg-slate-200 rounded mb-6"></div>
              <div className="h-10 w-full bg-slate-200 rounded-xl"></div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default JobDetailPageSkeleton;