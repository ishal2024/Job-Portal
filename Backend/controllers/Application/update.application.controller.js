import mongoose from "mongoose";
import apllicationsModel from "../../models/apllications.model.js";

async function updateApplicationStatus(req, res) {
    try {
        const { applicationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Application Id"
            });
        }

        const allowedStatus = ["Applied", "Rejected", "Shortlisted"]

        if (!allowedStatus.includes(req.body.status)) {
            return res.status(400).json({
                status: false,
                message: "Invalid status value"
            });
        }

        const updated = await apllicationsModel.findByIdAndUpdate(
            applicationId,
            { status: req.body.status },
            { new: true }
        ).populate("userId")

        if (!updated) {
            return res.status(404).json({
                status: false,
                message: "Application not found"
            });
        }

        return res.status(200).json({
            status: true,
            data : updated,
            message: "Application status Updated Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            description: error.message
        });
    }
}


export default updateApplicationStatus