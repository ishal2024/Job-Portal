import { Router } from "express";
import isUserAuthorize from "../middlewares/authorize.middleware.js";
import applicantDashboard from "../controllers/Dashboard/applicant.dashboard.controller.js";
import recruiterDashboard from "../controllers/Dashboard/recruiter.dashboard.controller.js";

const router = Router()

router.get('/applicant' , isUserAuthorize , applicantDashboard)

router.get('/recruiter' , isUserAuthorize , recruiterDashboard)

export default router