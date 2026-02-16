import usersModel from "../../models/users.model.js";
import {hashPassword} from "../../utils/bcrypt.password.js";
import { generateToken } from "../../utils/jwt.utils.js";


export async function registerUserController(req,res) {
    try {
        const existedUser = await usersModel.findOne({ email: req?.body?.email })
        if (existedUser)
            return res.status(400).json({status: false,message: "This email already exist" })

        const hashedPassword = await hashPassword(req?.body?.password)

        const createdUser = await usersModel.create({
            username : req?.body?.username,
            email : req?.body?.email,
            password : hashedPassword,
            role : req?.body?.role,
        })

        createdUser.password = undefined

        const token = generateToken(createdUser?._id)
        res.cookie("token", token, {
            httpOnly: true,
             secure: true,
            sameSite: "None",                          
            maxAge: 7 * 24 * 60 * 60 * 1000})

        return res.status(200).json({status : true , data : createdUser , message : "User is created Successfully"})

    } catch (error) {
        return res.status(500).json({status : false , message : "Internal Server Error" , description : error?.message})
    }
}