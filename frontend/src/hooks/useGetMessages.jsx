import { useEffect } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlice";

 const  useGetMessages = async () => {
const { selectedUser } = useSelector(store=>store.user)  
const dispatch = useDispatch()
  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`/api/v1/message/${selectedUser?._id}`)
            dispatch(setMessage(data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchMessages()
  },[selectedUser,dispatch])
}

export default useGetMessages;