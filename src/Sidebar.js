import React from 'react'
import './sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src="https://www.pngkey.com/png/detail/144-1445755_businessperson-portrait-stock-photography-businessman-stock.png"/>
            <div className='sidebar_headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
                <SearchOutlined />
                <input placeholder='search or start new chat' type='text'/>
            </div>
        </div>
        <div className="sidebar_chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
        </div>
    
    </div>
  )
}

export default Sidebar