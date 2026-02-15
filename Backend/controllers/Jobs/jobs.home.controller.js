import jobsModel from "../../models/jobs.model.js"

async function jobsForHomePage(req,res){
    try {
        const {page, limit} = req?.query

        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 10
        const skip = (pageNum - 1) * limitNum

        const jobs = await jobsModel.find().skip(skip).limit(limitNum).sort({createdAt : -1})

        const totalJobs = await jobsModel.countDocuments()

        return res.status(200).json({ status: true, 
            page : pageNum,
            limit : limitNum,
            totalPages : Math.ceil(totalJobs/limitNum),
            data: jobs, message: "All Jobs" }
        )

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default jobsForHomePage