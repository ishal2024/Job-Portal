import React, { useState, useSyncExternalStore } from 'react';
import { Mail, Lock, Check, Briefcase, User } from 'lucide-react';
import { signInUser } from '../../axios/authApi';
import { useDispatch } from 'react-redux'
import { addDashboardDetail, addDetail } from '../../Store/userSlicer';
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { applicantDashboard, recruiterDashboard } from '../../axios/dashboardApi';

const Signin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userType, setUserType] = useState('Applicant');

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInUser(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = {
        email,
        password,
      }

      const res = await signInUser(data)

      if (res?.status == 200) {
        dispatch(addDetail({ user: res?.data?.data }))
        console.log(res)

        if(res?.data?.data?.role == "Recruiter"){
          const res = await recruiterDashboard()
          if(res?.data?.status){
            dispatch(addDashboardDetail(res?.data?.data))
          }
        }

        if(res?.data?.data?.role == "Applicant"){
          const res = await applicantDashboard()
          if(res?.data?.status){
            dispatch(addDashboardDetail(res?.data?.data))
          }
        }

        setIsLoading(false)
        navigate('/')
      }

    } catch (error) {
      setIsLoading(false)
      console.log(error?.response?.data)
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">

      {/* --- Main Card --- */}
      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 relative overflow-hidden">

        {/* Decor: Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-violet-600"></div>

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600 shadow-sm border border-indigo-100">
            {/* Dynamic Icon based on selection */}
            {userType === 'applicant' ? (
              <User className="w-8 h-8" strokeWidth={2.5} />
            ) : (
              <Briefcase className="w-8 h-8" strokeWidth={2.5} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-2 text-center">
            Please enter your details to sign in
          </p>
        </div>

        {/* --- User Type Toggle --- */}
        {/* <div className="bg-slate-100 p-1.5 rounded-xl flex mb-8 relative">
          <button
            onClick={() => setUserType('Applicant')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'Applicant'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Applicant
          </button>
          <button
            onClick={() => setUserType('Recruiter')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'Recruiter'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Recruiter
          </button>
        </div> */}

        {/* --- Form Section --- */}
        <form className="space-y-5" onSubmit={handleSignInUser}>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative group">
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3.5 group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative group">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3.5 group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Options: Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-slate-300 rounded bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                <Check className="w-3.5 h-3.5 text-white absolute left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
              <span className="ml-2 text-sm text-slate-600 group-hover:text-slate-800 transition-colors select-none">Remember me</span>
            </label>

            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}



          <button
            disabled={isLoading}
            type='submit'
            className={`w-full flex items-center justify-center 
            ${isLoading ? 'bg-indigo-200 hover:bg-indigo-300' :'bg-indigo-600 hover:bg-indigo-700'} 
            text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.98] transition-all duration-200`}>
            {isLoading ? <RotatingLines
              visible={true}
              height="25"
              width="25"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : "Sign In"}
          </button>
        </form>

        {/* --- Footer --- */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
              Create an account
            </a>
          </p>
        </div>

      </div>

      {/* Background Decor (Optional subtlety) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
      </div>

    </div >
  );
};

export default Signin;