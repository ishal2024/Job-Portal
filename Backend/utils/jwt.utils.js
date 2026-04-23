import jwt from 'jsonwebtoken'

export function generateToken(userId){
    return jwt.sign({userId : userId} , process.env.JWT_SECRET_KEY , { expiresIn: "7d" })
}

export function verifyToken(token){
    return jwt.verify(token , process.env.JWT_SECRET_KEY)
}