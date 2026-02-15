import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.config.js'
import parser from 'cookie-parser'
import cors from 'cors'

// Configs
dotenv.config()
connectDB()

//app variable creation
const app = express()

// Global Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(parser())

app.use(cors({
    origin : "https://job-hunt-test.vercel.app",
    credentials : true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// Route Middleware Creation
import userRoute from './routes/user.routes.js'
import jobsRoute from './routes/jobs.routes.js'
import applicationRoute from './routes/application.route.js'
import dashboardRoute from './routes/dashboard.route.js'

app.use('/api/user' , userRoute)
app.use('/api/jobs' , jobsRoute)
app.use('/api/application' , applicationRoute)
app.use('/api/dashboard' , dashboardRoute)

app.get('/' , (req,res) => {
    res.status(200).json({
        message : "Hello World"
    })
})

//Listen Route
app.listen(3000, () => {
   console.log("Server is running :- ")
} )