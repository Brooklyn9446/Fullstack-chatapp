import jwt from "jsonwebtoken"
import { userModel } from "../Models/userModel.js"

export const protector = async (req, res, next) => {

    try {
 
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }
        const isVerified = jwt.verify(token, process.env.JWT_SECRET)

        if (!isVerified) {
            return res.status(401).json({ message: 'Invalid token' })
        }
        const user = await userModel.findById( isVerified).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
            
        }
        req.user=user
        next()
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
        
    }
}