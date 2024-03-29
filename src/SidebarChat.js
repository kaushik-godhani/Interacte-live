import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'

function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat_info'>
            <h2>room name</h2>
            <p>last message</p>
        </div>
    </div>
  )
}

export default SidebarChat