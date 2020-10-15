import React, { useEffect,useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from './axios.js'

function App() {

const [messages,setMessages] = useState([])
useEffect(()=>{
  axios.get('/messages/async').then(response=>{
    setMessages(response.data);
  })
},[]);

useEffect(()=>{
  var pusher = new Pusher('fadfaf4e9bedb9507ab8', {
    cluster: 'us2'
  });

  var channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage)=> {
    alert(JSON.stringify(newMessage));
    setMessages([...messages,newMessage])
  });
},[messages])

console.log(messages)
  return (
    <div className="App">
      <div className="app_body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
