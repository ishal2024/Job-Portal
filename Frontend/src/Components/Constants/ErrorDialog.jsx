import React, { useState, useEffect } from 'react';
import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react';

const ErrorDialog = ({isOpen , onClose , message}) => {
//   const [isOpen, setIsOpen] = useState(true);

  // Handle open/close animations
  useEffect(() => {   
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
      return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* --- Backdrop Overlay --- */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        
      ></div>

      {/* --- Modal Card --- */}
      <div 
        className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-out flex flex-col items-center p-8 text-center border border-slate-100 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        role="dialog"
        aria-modal="true"
      >
        
        {/* Icon Container */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" strokeWidth={2.5} />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Something Went Wrong
        </h2>
        
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <button 
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-200 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>

      </div>
    </div>
  );
};

export default ErrorDialog;