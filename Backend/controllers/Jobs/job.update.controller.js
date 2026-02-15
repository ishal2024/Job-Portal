import jobsModel from "../../models/jobs.model.js";

async function updateJobPost(req, res) {
  try {

    if(req.user.role == "Applicant")
        return res.status(400).json({status : "false" , message : "Applicants cannot update Job Post"})

    const jobPost = await jobsModel.findById(req?.params?.jobPostId)

    if (!jobPost) 
      return res.status(400).json({status: false,message: "Invalid Job ID"})

    if(!jobPost?.admin.equals(req.user?._id))
        return res.status(400).json({status: false,message: "Invalid Post Admin"})
    
    jobPost.position = req?.body?.position
    jobPost.company = req?.body?.company
    jobPost.location = req?.body?.location
    jobPost.jobType = req?.body?.jobType
    jobPost.salary = req?.body?.salary
    jobPost.description = req?.body?.description
    jobPost.skills = req?.body?.skills
    jobPost.status = req?.body?.status

    const updatedPost = await jobPost.save()

    return res.status(200).json({status: true,data: updatedPost,message: "Job Updated Successfully"})

  } catch (error) {
    return res.status(500).json({status: false,message: "Internal Server Error",description: error?.message})
  }
}


export default updateJobPost