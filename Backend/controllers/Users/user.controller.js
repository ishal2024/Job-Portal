async function sendUserData(req,res){
    try {
        return res.status(200).json({status : true , user : req?.user , message : "User data fetched succesfully"})
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default sendUserData