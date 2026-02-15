import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Components/Home/Home'
import Signin from '../Components/Auth/Signin'
import Signup from '../Components/Auth/Signup'
import Dashboard from '../Components/Dashboard/Dashboard'
import PostJobPage from '../Components/Dashboard/Recruiter/PostJobPage'
import SearchPage from '../Components/Home/SearchPage'
import JobDetailPage from '../Components/Constants/JobDetailPage'
import JobApplicantsPage from '../Components/Dashboard/Recruiter/JobApplicantsPage'

const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {path : '' , element : <Home />},
            {path : 'signin' , element : <Signin />},
            {path : 'signup' , element : <Signup />},
            {path : 'dashboard' , element : <Dashboard />},
            {path : 'postJob' , element : <PostJobPage />},
            {path : 'search' , element : <SearchPage />},
            {path : 'job/:jobId' , element : <JobDetailPage />},
            {path : 'dashboard/applicants' , element : <JobApplicantsPage />},
        ]
    }
])

export default router