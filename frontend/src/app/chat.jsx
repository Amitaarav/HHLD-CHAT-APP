"use client"
import React, { useEffect, useState } from 'react'
import io from "socket.io-client";

function chat() {

  const [msg, setMsg] = useState('');
  const [socket, setSocket ] = useState(null);

  const sendMsg = (e) => {
    e.preventDefault();
    if(socket){
        socket.emit('chat msg', hello);
        setMsg('')
    }
  }

  useEffect(()=>{

    // Establish websocket connection
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket);

    // clean up the function 
    return () => newSocket.close(); // whenever page is closed, cleanup function gets called
  }, [])
    return (
    <div>
        <form onSubmit={sendMsg} className="max-w-md mx-auto my-10">
        <div className="relative">
            <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your text here"
            required
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <button
            type="submit"
            className="text-white absolute inset-e-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
            Send
            </button>
        </div>
        </form>
    </div>
    );
}

export default chat