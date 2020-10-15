import React from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons'
function Chat({messages}) {
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat_headerRight">
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

            <div className="chat_body">
                {messages.map((message)=>(
                <p className="chat_message">
                    <span className="chat_name">{message.name}</span>
                    {message.message}

                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}
                
                <p className="chat_message">
                    <span className="chat_name">Varun</span>
                    This is a message

                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">Varun</span>
                    This is a message

                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>

            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input placeholder="Type a Message" type="text"/>
                    <button type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
