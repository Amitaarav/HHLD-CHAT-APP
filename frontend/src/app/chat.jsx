
"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat() {
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    console.log("Establishing websocket connection");

    const newSocket = io("http://localhost:8080");

    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("chat msg", (message) => {
      setMsgs((prevMsgs) => [...prevMsgs, message]);
    });

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();

    if (socket?.connected && msg.trim()) {
      socket.broadcast.emit("chat msg", msg);
      setMsg("");
    }
  };

  return (
    <div className="mt-8">
      <div className="msgs-container border-2 border-gray-300 max-w-md mx-auto space-y-0.5 rounded-2xl">
        {msgs.map((message, index) => (
          <div key={index} className="msg text-right m-5 bg-gray-100 rounded-sm p-2">
            {message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMsg} className="max-w-md mx-auto my-10">
        <div className="relative">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your text here"
            required
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          />

          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-4 py-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
