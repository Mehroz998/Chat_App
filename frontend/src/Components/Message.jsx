import React from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
  const {authUser, selectedUser} = useSelector(store=>store.user)
  let utcTime = message?.createdAt
  const pakistanTime = new Date(utcTime).toLocaleTimeString("en-PK", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format (AM/PM)
  });
  return (
    <div>
      <div className={`chat ${authUser._id === message.senderId?'chat-end':'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img
              alt="profile"
              src={authUser._id === message.senderId ? authUser.profilePhoto : selectedUser.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white font-bold">{pakistanTime}</time>
        </div>
        <div className={`chat-bubble ${authUser._id !== message.senderId&&'bg-white text-black'}`} >{message?.message}</div>
      </div>


      
    </div>
  );
};

export default Message;
