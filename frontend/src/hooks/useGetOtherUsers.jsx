import { useEffect } from "react"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setOtherUser } from "../redux/userSlice"

const useGetOtherUsers = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchOtherUsers = async () => {
        try {
            const { data } = await axios.get(`/api/v1/auth`);
            dispatch(setOtherUser(data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchOtherUsers()
  },[])
}

export default useGetOtherUsers;