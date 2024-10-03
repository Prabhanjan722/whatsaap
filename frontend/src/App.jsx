import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client'
import {setSocket} from "./redux/socketSlice"
import { setOnlineUsers } from "./redux/userSlice"

function App() {
  const { authUser } = useSelector(store=>store.user)
  const { socket } = useSelector(store=>store.socket)
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser) {
      const socket = io('http://localhost:8000', {
        query: {userId:authUser._id}
      });
      
     dispatch(setSocket(socket));
    
     socket.on('getOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
     });
     return () => socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
     }
  },[authUser])

  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <Routes>
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


