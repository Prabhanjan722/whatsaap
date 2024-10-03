import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

export default function Messages() {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;
  return (
    <>
      <div className="px-4 flex-1 overflow-auto bg-slate-700">
        {messages.map((currentMessage) => (
          <Message key={currentMessage._id} message={currentMessage} />
        ))}
      </div>
    </>
  );
}
