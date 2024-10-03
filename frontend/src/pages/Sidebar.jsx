import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import Otherusers from './Otherusers';
import { setOtherUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const [search,setSearch] = useState('');
  const { otherUser } = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const conversationUser = otherUser?.find((user) => user.fullname.toLowerCase().includes(search))
    if(conversationUser){
      dispatch(setOtherUser([conversationUser]))
    }else{
      toast.error("User not found!")
    }
  }

  return (
    <>
      <div className='flex flex-col lg:w-60 w-[40%] h-[100%] rounded-lg bg-slate-800 text-white
       '>
        <form onSubmit={handleSubmit} className='flex items-center absolute'>
          <input type="text" value={search} placeholder='Search...'
            onChange={(e) => setSearch(e.target.value)}
           className='w-[233px] h-10 bg-slate-500 text-white rounded-lg'/>

           <button type="submit" className='w-1 -red-500 h-10 -ml-5 rounded-lg'><BiSearchAlt2/></button>
        </form>
        <div className='overflow-x-hidden overflow-auto'>
        <Otherusers/>
        </div>
      </div>
    </>
  )
}
