import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () =>{
    const { socket } = useSelector(store=>store.socket);
    const { messages } = useSelector(store=>store.message);
    const dispatch = useDispatch()
  useEffect(() => {
    if (socket) {
        const handleMessage = (newMessage) => {
            dispatch(setMessage([...messages, newMessage]));
        };

        socket.on('newMessage', handleMessage);

        // Clean up the event listener on unmount
        return () => {
            socket.off('newMessage', handleMessage);
        };
    }
}, [socket, messages, dispatch]);

return null;
}

export default useGetRealTimeMessage;