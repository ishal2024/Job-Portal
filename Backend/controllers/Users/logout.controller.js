async function logOutUser(req,res){
    try {
        
         res.clearCookie("token")

        res.status(200).json({ status: true, message: "Logged out successfully"})

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}

export default logOutUser