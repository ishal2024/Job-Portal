import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Home from './Components/Home/Home'
import Signin from './Components/Auth/Signin'
import Signup from './Components/Auth/Signup'
import { Outlet } from 'react-router-dom'
import { loadUser } from './axios/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { addDashboardDetail, addDetail, removeUserData } from './Store/userSlicer'
import { applicantDashboard, recruiterDashboard } from './axios/dashboardApi'

function App() {

  const dispatch = useDispatch()

  async function handleLoadUser() {
    try {
      const res = await loadUser()
      console.log(res)
      if (res.data.status) {
        dispatch(addDetail({ user: res?.data?.user }))

        if (res?.data?.user?.role == "Recruiter") {
          const res = await recruiterDashboard()
          if (res?.data?.status) {
            console.log("Dashboard data " , res?.data?.data)
            dispatch(addDashboardDetail(res?.data?.data))
          }
        }

        if (res?.data?.user?.role == "Applicant") {
          const res = await applicantDashboard()
          if (res?.data?.status) {
            dispatch(addDashboardDetail(res?.data?.data))
          }
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLoadUser()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <Header />
        <Outlet />
      </div>

    </>
  )
}

export default App
