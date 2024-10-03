import React from 'react'
import Otheruser from './Otheruser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

export default function Otherusers() {
  useGetOtherUsers()
  const { otherUser } = useSelector(store=>store.user)
  const { authUser } = useSelector(store=>store.user)
  if(!otherUser) return;
  return (
    <>
      <div className='mt-12 h-48'>
        {
          otherUser.map((currentUser) => (
            <Otheruser key={currentUser._id} user={currentUser}/>
          ))
        }
      </div>

      <div>
          <div
            className="sticky top-[100vh]
             mt-[360px] flex gap-3 ml-5 p-1 rounded-sm cursor-pointer font-bold"
          >
            <img
              src={authUser?.profilePhoto}
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <p className="mt-2">{authUser?.fullname}</p>
          </div>
        </div>
    </>
  )
}
