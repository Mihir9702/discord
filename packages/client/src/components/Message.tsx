import React from 'react'

const Message: React.FC = () => {
  return (
    <div className="bg-gray-800 z-20 hover:bg-gray-700">
      <div className="flex p-6">
        {/*Image */}
        <div className="block bg-gray-900 p-6 h-6 rounded-full" />

        <div className="flex flex-col items-start ml-8 gap-y-2">
          <h1 className="hover:underline">Person 👨</h1>
          <span className="text-sm">The message from the user will be displayed here 📭</span>
        </div>
      </div>
    </div>
  )
}

export default Message
