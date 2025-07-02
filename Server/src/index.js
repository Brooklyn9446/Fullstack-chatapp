import express from "express"
import authRouter from "./Routes/authRouter.js"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./Lib/db.js"
import cookieParser from "cookie-parser"
import messageRouter from "./Routes/messageRouter.js"
import path from "path"
import {app,server} from "./Lib/socket.js"

dotenv.config()
const PORT=process.env.PORT

const __dirname=path.resolve()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
    
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/messages',messageRouter)

if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../../Client/dist")))

    app.get("/.*/",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../Client","dist","index.html"))
    })
}
server.listen(PORT,()=>{
    console.log('Server is running on Port:',PORT)
    connectDB()
})
