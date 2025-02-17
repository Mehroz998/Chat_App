import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`https://severe-annabell-mehrozali-9d0db8b7.koyeb.app/api/v1/message/send/${selectedUser._id}`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      res = await res.json();
      dispatch(setMessages([...messages, res]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white lg:rounded-lg p-2 shadow-md mt-2">
      <form action="" className="flex items-center" onSubmit={onSubmitHandler}>
        <textarea
          className="w-full p-2 text-black border-none rounded-lg resize-none overflow-hidden focus:outline-none"
          placeholder="Send Messages..."
          rows="1"
          style={{ minHeight: "40px", maxHeight: "100px" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="p-2" type="submit">
          <IoSend style={{ color: "rgb(75 85 99)", fontSize: "20px" }} />
        </button>
      </form>
    </div>
  );
};

export default SendInput;
