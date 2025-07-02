import { userModel } from "../Models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cloudinary from "../Lib/cloudnary.js"

//Signup
export const signup=async(req,res)=>{
    const{fullName,email,password}=req.body
    try {
        //hash password
        if(!password ||  !email || !fullName){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must contain 6 letters"})
        }
        
        const user= await userModel.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        

        const newUser=new userModel({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        
        if(newUser){
            //generate jwt token
            const token=jwt.sign(newUser._id.toString(),process.env.JWT_SECRET)

            res.cookie('jwt',token,{
                httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV!=="development"
            })
            await newUser.save()
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })

        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
         console.log("Error in signup controller",error.message)
         res.status(500).json({message:"Internal Server Error"})
    }    
}

//Login
export const login=async(req,res)=>{
    const{email,password}=req.body
   try {
        const user=await userModel.findOne({email})    
   
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        else{
            const token=jwt.sign(user._id.toString(),process.env.JWT_SECRET)

            res.cookie('jwt',token,{
                httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV!=="development"
            })
            
            return res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            })

        }


   } catch (error) {
            res.status(500).json({message:"Internal Server Error"})

   }

}
export const logout=(req,res)=>{
    try {
        res.cookie('jwt'," ");
       return res.status(200).json({message:"Logged out successfully"})

    } catch (error) {
        console.log("Error in server ",error)
       res.status(500).json({message:"Internal server error"}) 
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"})
        }
        const uploadResponce =await cloudinary.uploader.upload(profilePic)
        const updatedUser=await userModel.findByIdAndUpdate(userId,{profilePic:uploadResponce.secure_url},{new:true})
         
        res.status(200).json(updatedUser)
    } catch (error) { 
        console.log(req.body)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error occured in checkAuth controller ",error)
        res.status(500).json({message:"Internal server error"})
    }
}