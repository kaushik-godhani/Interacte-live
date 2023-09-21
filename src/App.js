import './App.css';
import { useEffect, useState } from 'react';
import Chat from './Chat';
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get('/message/sync').then(response=>{
      console.log(response.data);
      setMessages(response.data);
    })
  }, []);
  
  useEffect(()=>{
    var pusher = new Pusher('0c0eab94e1f40548031c', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      // alert(JSON.stringify(data));
      setMessages([...messages, data])
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe(); 
    };
    
  }, [messages]);

  console.log(messages);

  return (
    <div className="App">
      <div className="app_body">
        
        {/* side bar */}
        <Sidebar />

        {/* chat */}
        <Chat messages={messages} />

      </div>
      
    </div>
  );
}

export default App;
