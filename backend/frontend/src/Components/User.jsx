import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSelectedUser} from '../redux/userSlice'

const User = ({user}) => {
    const dispatch = useDispatch()
    const {selectedUser , onlineUsers} = useSelector(store=>store.user)
    const onlineUser = onlineUsers.includes(user._id)
    const selectedUserHandler = (suser)=>{
        dispatch(setSelectedUser(suser))
    }
  return (
    <div>
        <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser===user && 'bg-white text-black'} flex items-center gap-3 cursor-pointer hover:bg-white rounded-md p-2 hover:text-black`}>
            <div className={`avatar ${onlineUser&&'online'}`}>
                <div className='w-12 rounded-full'>
                    <img src={user?.profilePhoto} alt='profile' />
                </div>
            </div>
            <div>
                <div className=' flex justify-center flex-col'>
                    <p>{user?.name}</p>
                    <p className='text-gray-300 text-sm'>{`(${user?.username})`}</p>
                </div>
            </div>
        </div>
        <div className="divider py-0 my-0"></div>
    </div>
  )
}

export default User