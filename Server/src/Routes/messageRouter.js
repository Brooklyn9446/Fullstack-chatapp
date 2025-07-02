import express from "express"
import { protector } from "../Middlewares/authMiddleware.js"
import { getUsersForSidebar,getMessages,sendMessage } from "../Controllers/messageController.js"

const messageRouter=express.Router()

messageRouter.get("/users",protector,getUsersForSidebar)
messageRouter.get("/:id",protector,getMessages)
messageRouter.post("/send/:id",protector,sendMessage);

export default messageRouter