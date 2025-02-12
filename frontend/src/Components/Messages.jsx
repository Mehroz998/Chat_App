import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
import useGetRealtimeMessage from "../hooks/useGetRealtimeMessage";

const Messages = () => {
  useGetRealtimeMessage();
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to last message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser]);

  if (!messages) return null;

  return (
    <div className="px-4 flex flex-col h-full"> {/* Removed extra scroll */}
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      <div ref={messagesEndRef} className="h-1"></div> {/* Last message reference */}
    </div>
  );
};

export default Messages;
