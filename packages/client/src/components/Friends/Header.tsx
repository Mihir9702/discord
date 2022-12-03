import React, { useState } from 'react'
import InputField from '../InputField'

interface FriendsHeaderProps {
  user: { displayName: string; userId: number }[]
}

const Header: React.FC = () => {
  const [all, sAll] = useState(false)
  const [add, sAdd] = useState(false)
  const [pend, sPend] = useState(false)
  const [block, sBlock] = useState(false)
  const [hScreen, sHScreen] = useState('h-full')

  const handleFriendRequest = (params: { displayName: string; userId: number }) => {}

  return (
    <div className={`flex justify-center flex-col ${hScreen}`}>
      <p className="text-white py-2 flex justify-end gap-2 text-lg">
        <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
          Online
        </button>
        <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
          All
        </button>
        <button
          className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600"
          onClick={() => {
            sPend(!pend)
            sHScreen('h-screen')
          }}
        >
          Pending
        </button>
        <button className="text-sm font-bold p-2 rounded-lg hover:bg-blue-600" onClick={() => {}}>
          Blocked
        </button>
        <button
          className="text-sm font-bold bg-green-700 p-2 rounded-lg hover:bg-green-800 mr-72"
          onClick={() => {
            sAdd(!add)
            sHScreen('h-screen')
          }}
        >
          Add Friend
        </button>
        <p className="hover:bg-gray-700 p-1 rounded-md cursor-pointer">💬</p>
        <p className="hover:bg-gray-700 p-1 rounded-md cursor-pointer">🎯</p>
      </p>
      {add && (
        <div className="my-2 h-full">
          <div className="bg-slate-500 p-4 flex justify-center">
            {/* 
								1. Display Name [    ]
								2. User ID      [    ]
								3. Submit       [    ]

								*TEST ACCOUNTS*
								"adorable" 132 -> server -> if user exists, send friend request
								user: m912 pass: m912
								"proper" 1671 -> server -> if user exists, send friend request
								user: m219 pass: m219

								1. Check for "displayName" & Check for 0000
								2. Friend Rq Mutation receives proper params
								3. Successfully sends the frq to other user
								4. Log into other account and check for frq
						*/}
            {/* <form onSubmit={() => handleFriendRequest({ displayName, userId })}>
              <InputField label="Display Name" name="displayName" />
              <InputField label="User ID" name="userId" />
              <button type="submit">Send Friend Request</button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
