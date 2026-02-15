import React from 'react'
import { useSelector } from 'react-redux'
import RecruiterDashboard from './Recruiter/RecruiterDashboard'
import ApplicantDashboard from './Applicant/ApplicantDashboard'
import LoginRequiredPage from '../Constants/LoginRequiredPage'

function Dashboard() {

  const { userData } = useSelector((state) => state?.user)

  return (
    <>
      {
        userData?.role === "Recruiter" ? (
          <RecruiterDashboard />
        ) : userData?.role === "Applicant" ? (
          <ApplicantDashboard />
        ) : (
          <LoginRequiredPage />
        )
      }

    </>
  )
}

export default Dashboard