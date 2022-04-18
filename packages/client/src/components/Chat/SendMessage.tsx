import React from 'react'

const SendMessage = () => {
  const [messages, setMessages] = React.useState('')

  // ? When the user presses enter, send the message to the server
  // ! not implemented yet

  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(messages)
    setMessages('')
  }

  return (
    <div className="home-chat-background z-10 inset-0 left-72 ml-6 text-center shadow-md right-auto overflow-y-auto">
      <div className="absolute left-0 bottom-10">
        <form className="bg-gray-900 mt-1 fixed w-5/6" onSubmit={handleMessage}>
          <input
            className="w-full bg-gray-700 text-text text-sm font-medium rounded py-2 px-4 focus:outline-none "
            type="text"
            placeholder="Type a message..."
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default SendMessage
