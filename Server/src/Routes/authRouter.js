import express from "express"
import {protector} from "../Middlewares/authMiddleware.js"
import {signup,login,logout,updateProfile,checkAuth} from "../Controllers/authController.js"
const authRouter=express.Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.put('/updateProfile',protector,updateProfile)
authRouter.get('/check',protector,checkAuth)

export default authRouter