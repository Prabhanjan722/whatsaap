import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

export default function Otheruser({ user }) {
  const dispatch = useDispatch();
  const { onlineUsers, selectedUser } = useSelector((store) => store.user);
  const isOnLine = onlineUsers.includes(user._id)
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  console.log(user._id)

  return (
    <>
      <div className="bg-white">
        <ul>
          <li
            onClick={() => selectedUserHandler(user)}
            className={` ${
              selectedUser?._id === user?._id
                ? "bg-slate-200 text-black"
                : "bg-slate-800"
            } 
             mt-3 flex gap-2 border-b-2 border-b-sky-700 
             border-r-slate-300 border-l-slate-300 hover:bg-slate-200 hover:text-black p-1 rounded-sm cursor-pointer`}
          >
            <img
              src={user?.profilePhoto}
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            {
              isOnLine && <span className="bg-green-500 h-2 w-2 rounded-full -ml-5 "></span>
            }
            
            <p className="mt-2">{user?.fullname}</p>
          </li>
        </ul>
      </div>

      
    </>
  );
}
