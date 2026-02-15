import express from "express";
import isUserAuthorize from "../middlewares/authorize.middleware.js";
import createApplication from "../controllers/Application/create.application.controller.js";
import updateApplicationStatus from "../controllers/Application/update.application.controller.js";

const router = express.Router()

router.get('/create/:jobId' , isUserAuthorize , createApplication)

router.post('/update/status/:applicationId' , isUserAuthorize , updateApplicationStatus)

export default router