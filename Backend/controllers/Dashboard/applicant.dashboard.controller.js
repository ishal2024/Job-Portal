import apllicationsModel from "../../models/apllications.model.js";

async function applicantDashboard(req,res){
    try {
        const applications = await apllicationsModel.find({"userId" : req?.user?._id}).populate("jobId")

        // if(applications.length == 0)
        //     return res.status(200).json({status : true , data : applications , message : "All Applied Jobs of Applicant"})

        let shortlistedJobs = 0
        let rejectedJobs = 0

        applications.map((jobs) => {
            if(jobs.status == "Rejected")
                rejectedJobs += 1
            else if(jobs.status == "Shortlisted")
                shortlistedJobs += 1
        })

        return res.status(200).json({
            status : true,
            data : {
                jobs : applications,
                total_applied_jobs : applications.length,
                total_rejected_jobs : rejectedJobs,
                total_shortlisted_jobs : shortlistedJobs
            },
            message : "Applicant dashboard data"
        })

    } catch (error) {
        return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message})
    }
}

export default applicantDashboard