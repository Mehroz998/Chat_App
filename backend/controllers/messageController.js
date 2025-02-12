import {Message} from "../models/messageModel.js"
import {Conversation} from '../models/conversationModel.js'
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; // Sender ID from authenticated request
        const receiverId = req.params.id; // Receiver ID from route params
        const { message } = req.body; // Extract message from the request body

        // Check if a conversation already exists
        let gotConversation = await Conversation.findOne({
            participents: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create a new one
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participents: [senderId, receiverId],
                // messages: []
            });
        }

        // Create a new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // Push the new message ID to the conversation's messages array
        if (gotConversation && newMessage) {
            gotConversation.messages.push(newMessage._id);
            // await gotConversation.save(); // Save the updated conversation
            // await newMessage.save();
        }
        await Promise.all([gotConversation.save(),newMessage.save()])

        //Socket IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }

        // Respond with success
        return res.send(newMessage);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participents:{$all : [senderId , receiverId]}
        }).populate("messages")
        return res.status(200).json(conversation?.messages || [])
    } catch (error) {
        console.log(error)
    }
}