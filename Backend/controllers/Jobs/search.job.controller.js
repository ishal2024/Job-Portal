import jobsModel from "../../models/jobs.model.js"

async function searchJobs(req, res) {
    try {
        console.log(req?.query)
        const { search, page, limit } = req?.query
        const {jobType , freshness} = req?.body
        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 15
        const skip = (pageNum - 1) * limitNum


        if (!search)
            return res.status(400).json({ status: false, message: "Please enter serach data" })

        let query = {
            $text: { $search: search }
        }

        if(!jobType.includes("all")){
            query.jobType = {$in : jobType}
        }

        const jobs = await jobsModel.find(
            query,
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).skip(skip).limit(limitNum)

        const totalJobs = await jobsModel.countDocuments(query)

        return res.status(200).json({ status: true, 
            page : pageNum,
            limit : limitNum,
            totalPages : Math.ceil(totalJobs/limitNum),
            data: jobs, message: "All Search Jobs" }
        )
``
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default searchJobs