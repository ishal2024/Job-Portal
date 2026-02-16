import React from 'react';
import { Lock, LogIn, UserPlus, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginRequiredPage = () => {

    const navigate = useNavigate()

  return (
    <div className="mt-15  flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- Background Decor (Subtle Gradients) --- */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-[100px]"></div>
      </div> */}

      {/* --- Main Card --- */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 text-center transform transition-all hover:scale-[1.01] hover:shadow-2xl duration-500 ease-out animate-[fadeIn_0.6s_ease-out]">
        
        {/* Icon Section */}
        <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 relative group">
          {/* Pulse Effect */}
          <div className="absolute inset-0 bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
          
          <div className="relative z-10 bg-white p-4 rounded-full shadow-sm border border-indigo-100">
            <Lock className="w-8 h-8 text-indigo-600" strokeWidth={2.5} />
          </div>
          
          {/* Small Badge */}
          <div className="absolute -top-1 -right-1 bg-amber-100 text-amber-600 p-1.5 rounded-full border-2 border-white shadow-sm">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Login Required
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          You must be logged in to access this page. <br className="hidden sm:block" />
          Please sign in to your account or create a new one to continue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 focus:ring-4 focus:ring-indigo-500/20">
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>

          
        </div>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-slate-50">
          <button onClick={() => navigate(-1)} href="#" className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors">
            Return to Home Page
          </button>
        </div>

      </div>

      {/* Inline Animation Style for Fade In */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginRequiredPage;