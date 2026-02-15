import usersModel from "../models/users.model.js";
import { verifyToken } from "../utils/jwt.utils.js";

async function isUserAuthorize(req,res,next){
    try {
        const token = req?.cookies?.token
        console.log(token)
        if(!token)
            return res.status(200).json({status : false , message : "This action is UnAuthorized"}) 

        const decodedToken = verifyToken(token)

        const user = await usersModel.findOne({"_id" : decodedToken?.userId})

        if(!user)
            return res.status(200).json({status : false , message : "Invalid Token"})

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message}) 
    }
}


export default isUserAuthorize