import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Briefcase, UserPlus, AlertCircle } from 'lucide-react';
import { registerUser } from '../../axios/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { addDetail } from '../../Store/userSlicer';

const Signup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userType, setUserType] = useState('Applicant');

  const [isLoading, setIsLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegisterUser(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = {
        username,
        email,
        password,
        role: userType
      }

      const res = await registerUser(data)
      console.log(res)

      if (res?.status == 200) {
        dispatch(addDetail({ user: res?.data?.data }))
        console.log(res)
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
      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 relative overflow-hidden transition-all duration-300">

        {/* Decor: Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-violet-600"></div>

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600 shadow-sm border border-indigo-100 transition-colors duration-300">
            {userType === 'applicant' ? (
              <UserPlus className="w-8 h-8" strokeWidth={2.5} />
            ) : (
              <Briefcase className="w-8 h-8" strokeWidth={2.5} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 text-sm mt-2 text-center">
            Please enter your details to sign up
          </p>
        </div>

        {/* --- User Type Toggle --- */}
        <div className="bg-slate-100 p-1.5 rounded-xl flex mb-8 relative">
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
        </div>

        {/* --- Form Section --- */}
        <form className="space-y-5" onSubmit={handleRegisterUser}>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
            <div className="relative group">
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-3.5 group-focus-within:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all
                     border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500`}
              />
              <Mail className={`w-5 h-5 absolute left-3 top-3.5 transition-colors text-slate-400 group-focus-within:text-indigo-500`}
              />
            </div>

            {/* Email Error Message */}

          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative group">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-a 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'}`}
              />
              <Lock className={`w-5 h-5 absolute left-3 top-3.5 transition-colors text-slate-400 group-focus-within:text-indigo-500`}
              />
            </div>

            {/* Password Error Message */}

          </div>

          {/* Submit Button */}
          <button
            className={`w-full flex items-center justify-center  font-bold py-3.5 rounded-xl shadow-lg transition-all duration-200 mt-2 
              ${isLoading ? 'bg-indigo-200 hover:bg-indigo-300' :'bg-indigo-600 hover:bg-indigo-700'} 
              text-white shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.98] cursor-pointer`}
            disabled={isLoading}
          >
            {isLoading ?
              <RotatingLines
                visible={true}
                height="25"
                width="25"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              : "Sign Up"}
          </button>
        </form>

        {/* --- Footer --- */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
              Signin
            </a>
          </p>
        </div>

      </div>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
      </div>

    </div>
  );
};

export default Signup;