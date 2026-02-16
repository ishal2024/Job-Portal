import jobsModel from "../../models/jobs.model.js";

async function recruiterDashboard(req,res){
    try {
        const createdJobs = await jobsModel.find({"admin" : req.user._id}).sort({createdAt : -1})

        return res.status(200).json({status : true , data : createdJobs , message : "All Created Jobs"})

    } catch (error) {
        return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message})
    }
}

export default recruiterDashboard