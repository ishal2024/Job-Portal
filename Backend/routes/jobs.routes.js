import express from 'express'
import { createJob } from '../controllers/Jobs/job.create.controller.js'
import isUserAuthorize from '../middlewares/authorize.middleware.js'
import updateJobPost from '../controllers/Jobs/job.update.controller.js'
import viewAllJobApplicants from '../controllers/Jobs/job.applicants.controller.js'
import searchJobs from '../controllers/Jobs/search.job.controller.js'
import jobsForHomePage from '../controllers/Jobs/jobs.home.controller.js'
import deleteJobPost from '../controllers/Jobs/job.delete.controller.js'
import specificJobData from '../controllers/Jobs/specific.job.controller.js'

const router = express.Router()

router.post('/create' , isUserAuthorize , createJob)

router.post('/update/:jobPostId' , isUserAuthorize , updateJobPost)

router.get('/delete/:jobId' , isUserAuthorize , deleteJobPost)

router.get('/applicants/:jobId' , isUserAuthorize , viewAllJobApplicants)

router.get('/job/:jobId' , isUserAuthorize ,specificJobData)

router.get('/search'  , searchJobs)

router.get('/home'  , jobsForHomePage)

export default router