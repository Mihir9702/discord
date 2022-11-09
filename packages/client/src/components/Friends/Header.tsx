import React from 'react'

const Header = () => {
  return (
    <p className="text-white p-4 flex justify-end gap-2 text-lg">
      <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
        Online
      </button>
      <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
        All
      </button>
      <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
        Pending
      </button>
      <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
        Blocked
      </button>
      <button
        className="text-sm font-bold bg-green-700 p-2 rounded-lg hover:bg-green-800 mr-72"
        onClick={() => {}}
      >
        Add Friend
      </button>
      <p className="hover:bg-gray-700 p-1 rounded-md cursor-pointer">💬</p>
      <p className="hover:bg-gray-700 p-1 rounded-md cursor-pointer">🎯</p>
    </p>
  )
}

export default Header
