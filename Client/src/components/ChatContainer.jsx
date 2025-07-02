import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChat'
import { useAuthStore } from '../store/useAuth'
import MessageInput from "./MessageInput"
import MessageSkeleton from './skeletons/MessageSkeleton'
import avatar from "../pages/avatar.png"

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeToMessages } = useChatStore()
    const { authUser } = useAuthStore()
    useEffect(() => {
        getMessages(selectedUser._id)
        subscribeToMessages()
        return()=>unsubscribeToMessages()
    }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeToMessages])
                           
    const messageEndRef=useRef(null)
    useEffect(()=>{
        if(messageEndRef.current&&messages){

            messageEndRef.current.scrollIntoView({behavious:"smooth"})
        }
    },[messages])
    if (isMessagesLoading) {
        return (
            <div className='flex-1 flex flex-col overflow-auto'>
                <ChatHeader></ChatHeader>
                <MessageSkeleton />
                <MessageInput></MessageInput>
            </div>

        )
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((messages) => (
                    
                    <div
                        key={messages._id}
                        className={`chat ${messages.senderId === selectedUser._id ? "chat-start" : "chat-end"}`}
                        ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={messages.senderId === selectedUser._id ?  selectedUser.profilePic||avatar:authUser.profilePic} alt="profile-pic" ></img>
                            </div>
                        </div>

                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {messages.createdAt}
                            </time>
                        </div>
                        <div className='chat-bubble flex flex-col '>
                            {messages.image&&(
                                <img src={messages.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2'></img>
                            )}
                                {messages.text && <p>{messages.text}</p>}
                        </div>
                    </div>
                ))

                } 

            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer