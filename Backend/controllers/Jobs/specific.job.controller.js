import apllicationsModel from "../../models/apllications.model.js"
import jobsModel from "../../models/jobs.model.js"


async function specificJobData(req, res, next) {
    try {
        const id = req.params.jobId

        const [job, jobApplication] = await Promise.all([
            jobsModel.findOne({ _id: id }),
            apllicationsModel.findOne({ jobId: id, userId: req?.user?._id })
        ]);

        console.log("job : " , job)
        console.log("job application : " , jobApplication)

        if (jobApplication)
            return res.status(200).json({ status: true, data: { job, alreadyApplied: true }, message: "Successfull" })
        else
            return res.status(200).json({ status: true, data: { job, alreadyApplied: false }, message: "Successfull" })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default specificJobData