import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  Bookmark
} from 'lucide-react';
import { useSelector } from 'react-redux';

const ApplicantDashboard = () => {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const {userDashboardData} = useSelector((state) => state.user)

  const stats = [
    { label: 'Total Applied', value: userDashboardData?.total_applied_jobs, icon: <FileText className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Total Shortlisted', value: userDashboardData?.total_shortlisted_jobs, icon: <CheckCircle className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Total Rejected', value: userDashboardData?.total_rejected_jobs, icon: <Bookmark className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Shortlisted</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Applied</span>;
    }
  };

  console.log(userDashboardData)
    

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex">
      
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- 1. Left Sidebar --- */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-indigo-200">
            <Briefcase className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            JobHunt
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-medium transition-all shadow-sm shadow-indigo-100">
            <LayoutDashboard className="w-5 h-5" />
            Applied Jobs
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors group">
            <User className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            My Profile
          </a>

          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors group">
            <Bookmark className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            Saved Jobs
          </a>

          <div className="mt-8">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Settings</p>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors group">
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              Account Settings
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium hover:bg-red-50 hover:text-red-600 transition-colors group">
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
              Sign Out
            </a>
          </div>
        </nav>

        {/* Bottom Upgrade Card */}
        {/* <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6 group-hover:bg-white/20 transition-all"></div>
            
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              </div>
              <span className="font-bold text-lg">Go Pro</span>
            </div>
            
            <p className="text-indigo-100 text-sm mb-4 relative z-10 opacity-90">
              Get 3x more visibility and priority support.
            </p>
            
            <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-lg text-sm hover:bg-indigo-50 transition-colors shadow-sm relative z-10">
              Upgrade Now
            </button>
          </div>
        </div> */}
      </aside>

      {/* --- 2. Main Content Area --- */}
      <main className="flex-1 min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-indigo-600 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Applicant Dashboard</h1>
              <p className="hidden sm:block text-slate-500 text-sm">Manage and track your job applications.</p>
            </div>
          </div>

        </header>

        <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">

          {/* --- 3. Applications Table Card --- */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                My Applications
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userDashboardData?.jobs?.map((job) => (
                    <tr key={job._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{job?.jobId?.position}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                            <Briefcase className="w-3 h-3" />
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{job?.jobId?.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(job?.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(job?.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-indigo-600 p-1 hover:bg-indigo-50 rounded transition-all">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 text-center">
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                View All Applications
              </button>
            </div>
          </section>

          {/* --- 4. Stats Cards Section (Below Table) --- */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats?.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;