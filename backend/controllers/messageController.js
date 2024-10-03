import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import {getReceiverSocketId, io} from '../index.js'

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await Promise.all([gotConversation.save(), newMessage.save()])

    //socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(200).json({newMessage});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
        participants:{$all:[senderId, receiverId]}
    }).populate("messages")
    res.status(200).json(conversation?.messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
