import apllicationsModel from "../../models/apllications.model.js";


async function viewAllJobApplicants(req,res){
    try {
        const allApplicants = await apllicationsModel.find(
            {"jobId" : req.params.jobId},
        ).populate("userId")

        return res.status(200).json({status : true , data : allApplicants , message : "All applicants of Provided Job Id"})

    } catch (error) {
        return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message})
    }
}

export default viewAllJobApplicants