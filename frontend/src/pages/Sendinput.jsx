import React, { useState } from "react";
import { BiSearchAlt2, BiSend } from "react-icons/bi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";
import { BsEmojiSmileFill } from 'react-icons/bs'
import Picker from 'emoji-picker-react'

export default function Sendinput() {
  const [message, setMessageUser] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const [showEmojiPicker,setShowEmojiPicker] = useState(false)

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/message/send/${selectedUser?._id}`,
        {message}
      );
      setMessageUser(data);
      dispatch(setMessage([...messages, data?.newMessage]));
      setShowEmojiPicker(false); 
    } catch (error) {
      console.log(error);
    }
    setMessageUser("");
  };

  return (
    <>
      
      {
          showEmojiPicker && <Picker onEmojiClick={(emojiObject)=> setMessageUser((prevMsg)=> prevMsg += emojiObject.emoji)}/>
      }
     
      <div className={`w-full bg-slate-800 sticky top-[100vh]`}>
        
        <form onSubmit={handleSubmit} className="flex items-center ">
        <div className="p-3 text-2xl text-yellow-400"><BsEmojiSmileFill className="cursor-pointer"
         onClick={handleEmojiPicker}/>
         
         </div>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessageUser(e.target.value)}
          className="w-[86%] h-10  text-black rounded-lg"
        />

        <button type="submit" className="w-1 h-10 -ml-5 rounded-lg">
          <BiSend className="text-black -ml-2 text-2xl" />
        </button>
        </form>
      </div>
    </>
  );
}
