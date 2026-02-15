import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ["Full-Time","Internship" , "Remote", "Contract"],
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    applicants: {
        type: Number,
        default: 0
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    //this key-value pair used to track that user can still apply to this job or not
    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

jobSchema.index({
    position: "text",
    company: "text",
    jobType: "text",
    location: "text",
    skills: "text"
},
    {
        weights: {
            position: 5,
            location: 3,
            company: 2
        }
    }
)



export default mongoose.model("Job", jobSchema)