import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import Sendinput from "./Sendinput";
import toast from "react-hot-toast";
import Messages from "./Messages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setAuthUser, setSelectedUser } from "../redux/userSlice";

export default function MessageContainer() {
  const navigate = useNavigate();
  const { authUser ,selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchOtherUsers = async () => {
    try {
      const data = await axios.get("/api/v1/auth/logout");
      navigate("/");
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setSelectedUser(null))
  },[])

  return (
    <>
      {selectedUser ? (
        <div className="ml-2 border-r-2 border-l-2 border-slate-500 w-[70%] h-[100%] flex flex-col">
          <div className="bg-slate-900 h-12 flex justify-between items-center p-3">
            <div className="flex gap-1">
              <img
                src={selectedUser?.profilePhoto}
                alt="profile"
                className="rounded-full w-10 h-10"
              />
              <p className="mt-2 font-bold ml-1 text-white">{selectedUser?.fullname}</p>
            </div>

            <BiLogOut
              className="w-10 h-8 rounded-md bg-slate-600 text-white hover:bg-slate-900 cursor-pointer"
              onClick={fetchOtherUsers}
            />
          </div>

          <Messages />

          <Sendinput />
        </div>
      ) : (
        <div className="ml-2 w-[70%] h-[450px]">
          <div className="bg-slate-700 w-[100%] h-[130%] rounded-md flex justify-center 
          items-center p-3 text-5xl font-bold font-serif">
            <div className="flex flex-col">
            <span className="ml-20 text-2xl font-semibold text-white" style={{ textTransform: 'capitalize' }}>
              Hi {authUser?.fullname}</span>
            <p className="text-1xl text-white">Let's Chat</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
