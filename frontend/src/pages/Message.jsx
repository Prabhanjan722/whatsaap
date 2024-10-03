import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Message({ message }) {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
        ref={scroll}
        className={`chat ${
          authUser?._id === message?.senderId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                message?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">
            {moment(message.createdAt).format
            ('h:mm')}</time>
        </div>
        <div
          className={`chat-bubble chat-bubble-success text-white
         ${
           authUser?._id === message?.senderId
             ? "chat-end bg-green-700"
             : "chat-start bg-slate-900"
         }`}
        >
          {message?.message}
        </div>
      </div>
    </>
  );
}
