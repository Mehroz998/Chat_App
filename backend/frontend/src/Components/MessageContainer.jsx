import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser , onlineUsers } = useSelector((store) => store.user);
  if(selectedUser){
    var onlineUser = onlineUsers.includes(selectedUser._id)
  }
  const dispatch = useDispatch()
  const handleBack = ()=>{
    dispatch(setSelectedUser(null))
  }

  return (
    <div className={`${selectedUser?'w-screen sm:w-[68vw]':'sm:w-[68vw]'} relative ${selectedUser?'flex':'hidden'} sm:flex flex-col h-full`}>
      {selectedUser ? (
        <>
          {/* Profile Section - Fixed Height */}
          <div className="flex items-center gap-3 p-2 bg-gray-600 rounded-b-lg shrink-0">
            <button className='text-2xl mr-2 sm:hidden' onClick={handleBack}><IoMdArrowRoundBack /></button>
            
            <div className={`avatar`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="Profile" />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <p>{selectedUser?.name}</p>
                <p className="text-xs">{onlineUser&&'online'}</p>
              </div>
            </div>
          </div>

          {/* Messages Section - Only Scroll Here */}
          <div className="flex-1 overflow-y-auto pb-16">
            <Messages />
          </div>

          {/* Send Input - Fixed at Bottom */}
          <SendInput />
        </>
      ) : (
        <div className="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Conversation...
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
