import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongo DB connected")
    }catch(error){
        console.log(error)
    }
}