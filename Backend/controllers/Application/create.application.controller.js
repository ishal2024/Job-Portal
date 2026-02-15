import apllicationsModel from "../../models/apllications.model.js";
import jobsModel from "../../models/jobs.model.js";


async function createApplication(req, res) {
    try {
        const jobId = req.params.jobId

        if (req.user.role == "Recruiter")
            return res.status(400).json({ status: "false", message: "Recruiter cannot apply for job" })

        const [jobPost, isApplicationExist] = await Promise.all([
            jobsModel.findOne({ _id: jobId }),
            apllicationsModel.findOne({
                jobId: jobId,
                userId: req?.user?._id
            })
        ]);


        if (!jobPost)
            return res.status(400).json({ status: false, message: "Invalid Post Id" })

        if (isApplicationExist)
            return res.status(400).json({ status: false, message: "You already applied this job" })

        const createdApplication = await apllicationsModel.create({
            jobId,
            userId: req.user?._id
        })

        jobPost.applicants += 1
        await jobPost.save()

        return res.status(200).json({ status: true, data: createdApplication, message: "User applied successfully for this job" })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default createApplication