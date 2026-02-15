import mongoose from "mongoose";


async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DB is Connected")
    } catch (error) {
        console.log("DB is not connected " , error?.message)
        process.exit(1)
    }
}

export default connectDB