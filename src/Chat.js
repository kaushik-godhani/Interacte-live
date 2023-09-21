import React, { useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@mui/icons-material'
import axios from './axios'

function Chat({ messages }) {
  
  const [input, setInput] = useState("");

  const sendMessage = async (e)=>{
    e.preventDefault();

    await axios.post("/message/new", {
      message: input,
      name: "rock",
      timeStamp: "easy",
      received: true
    });

    setInput("");
  }

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>room name</h3>
          <p>last seen at:  sjdhkud</p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat_body'>
        {messages.map((message)=>(
          <p className={`chat_message ${message.received && "chat_reciver"}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timeStamp'>{message.timeStamp}</span>
          </p>
        ))}
        

        {/* <p className='chat_message chat_reciver'>
          <span className='chat_name'>test</span>
          this is a message
          <span className='chat_timeStamp'>{new Date().toUTCString()}</span>
        </p> */}
      </div>

      <div className='chat_footer'>
        <InsertEmoticon />
        <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='type a message' type='text'/>
          <button onClick={sendMessage}  type='submit'>
            send a message
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  )
}

export default Chat