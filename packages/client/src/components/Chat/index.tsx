import React from 'react'
import Messages from './Messages'
import SendMessage from './SendMessage'

const Chat = () => {
  return (
    <div className="home-chat-background z-10 inset-0 fixed left-72 ml-6 text-center text-gray-100 shadow-md right-auto overflow-y-auto">
      <Messages />
      <SendMessage />
    </div>
  )
}

export default Chat
