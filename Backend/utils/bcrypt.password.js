import bcrypt from 'bcrypt'


export async function hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password , salt)
    return newPassword
}

export async function verifyPassword(password , hashPassword){
    return await bcrypt.compare(password , hashPassword)
}