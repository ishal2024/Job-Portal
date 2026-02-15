import apllicationsModel from "../../models/apllications.model.js"
import jobsModel from "../../models/jobs.model.js"

async function deleteJobPost(req,res){
    try {
        
        const id = req.params.jobId

        const doc = await jobsModel.findOneAndDelete({"_id" : id})

        if(!doc)
            return res.status(400).json({status: false ,message: "No job post found"})

        await apllicationsModel.deleteMany({jobId : id})

        return res.status(200).json({status: true, data : doc ,message: "Document Deleted Successfully"})


    } catch (error) {
       return res.status(500).json({status: false,message: "Internal Server Error",description: error?.message})
    }
}

export default deleteJobPost