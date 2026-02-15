import jobsModel from "../../models/jobs.model.js";


export async function createJob(req,res){
    try {

        if(req.user.role == "Applicant")
            return res.status(400).json({status : "false" , message : "Applicants cannot create Job Post"})

        const createdJob = await jobsModel.create({
            position : req?.body?.position,
            company : req?.body?.company,
            location : req?.body?.location,
            jobType : req?.body?.jobType,
            salary : req?.body?.salary,
            description : req?.body?.description,
            skills : req?.body?.skills,
            admin : req?.user?._id,
            status : req?.body.status
        })

        res.status(200).json({status : true , data : createdJob , message : "Job is created Successfully"})

    } catch (error) {
       return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message}) 
    }
}