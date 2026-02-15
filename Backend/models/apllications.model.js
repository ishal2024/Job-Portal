import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    jobId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Job"
    },

    userId : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "User"
    },

    status : {
        type : String,
        enum : ["Applied" , "Rejected" , "Shortlisted"],
        default : "Applied"
    }

} , {timestamps : true})


export default mongoose.model("Application" , applicationSchema)
