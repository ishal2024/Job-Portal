import usersModel from "../../models/users.model.js";
import { verifyPassword } from "../../utils/bcrypt.password.js";
import { generateToken } from "../../utils/jwt.utils.js";

export async function loginUserController(req, res) {
    try {
        if (!req?.body?.email || !req?.body?.password)
            return res.status(400).json({ status: false, message: "Email or Password field is required" })

        const user = await usersModel.findOne({ email: req?.body?.email })
        if (!user)
            return res.status(400).json({ status: false, message: "Inavlid Email or Passord" })

        const isMatch = await verifyPassword(req?.body?.password, user?.password)

        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Inavlid Email or Passord" })
        }

        const token = generateToken(user?._id)
        res.cookie("token", token, {httpOnly: true,         
            secure: true,
            sameSite: "None",         
            maxAge: 7 * 24 * 60 * 60 * 1000})
        user.password = undefined

        return res.status(200).json({ status: true, data: user, message: "User logged in successfully" })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error", description: error?.message })
    }
}