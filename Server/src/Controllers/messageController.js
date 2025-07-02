import { userModel } from "../Models/userModel.js";
import messageModel from "../Models/messageModel.js";
import cloudinary from "../Lib/cloudnary.js";
import { getReceiverSocketId,io } from "../Lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
   
    try {
        const loggedInUserId = req.user._id;
        const filteredUSers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password")   //find the users otherthan userId
        res.status(200).json(filteredUSers)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id
        const message = await messageModel.find({
            $or: [
                { senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ]
        })

        res.status(200).json(message)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;
        if (image) {

            const uploadResponce = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponce.secure_url
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl

        })
        await newMessage.save()

        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverSocketId)[
            io.to(receiverSocketId).emit("newMessage",newMessage )        //emitting the message to a specific chat only
        ]

        res.status(200).json(newMessage)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}