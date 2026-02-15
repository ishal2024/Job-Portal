import express from 'express' 
import { registerUserController } from '../controllers/Users/register.controller.js'
import { loginUserController } from '../controllers/Users/login.controller.js'
import logOutUser from '../controllers/Users/logout.controller.js'
import sendUserData from '../controllers/Users/user.controller.js'
import isUserAuthorize from '../middlewares/authorize.middleware.js'

const router = express.Router()

router.post('/register' , registerUserController)

router.post('/login' , loginUserController)

router.get('/logout' , logOutUser)

router.get('/me' , isUserAuthorize , sendUserData)


export default router