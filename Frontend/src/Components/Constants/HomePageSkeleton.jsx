import React from 'react';

const HomePageSkeleton = () => {
  // Create an array of 6 items to simulate multiple job cards loading
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- 1. Top Section (Header Skeletons) --- */}
        <div className="mb-10 space-y-4 animate-pulse">
          {/* Heading Bar */}
          <div className="h-10 bg-slate-200 rounded-lg w-3/4 sm:w-1/3"></div>
          
          {/* Subtitle Bar */}
          <div className="h-5 bg-slate-200 rounded-md w-1/2 sm:w-1/4"></div>
        </div>

        {/* --- 2. Job Cards Skeleton Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm animate-pulse flex flex-col h-full"
            >
              {/* Card Header: Icon + Title */}
              <div className="flex items-start gap-4 mb-6">
                {/* Circular Skeleton (Icon) */}
                <div className="w-14 h-14 bg-slate-200 rounded-xl shrink-0"></div>
                
                <div className="flex-1 space-y-3 py-1">
                  {/* Title Bar */}
                  <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  {/* Company/Location Bar */}
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>

              {/* Card Body: Info Bars */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-2">
                  <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-slate-50 rounded w-full"></div>
              </div>

              {/* Card Footer: Tags & Button */}
              <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                {/* Type Badge */}
                <div className="h-7 w-20 bg-slate-100 rounded-full"></div>
                
                {/* Action Button */}
                <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePageSkeleton;