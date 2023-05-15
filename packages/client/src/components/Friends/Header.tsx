import React, { useState } from 'react'
import InputField from '../InputField'
import Link from 'next/link'
import Image from 'next/image'
import Smile from '../../assets/smile.svg'
import MessageSquare from '../../assets/message-square.svg'
import Inbox from '../../assets/inbox.svg'
import HelpCircle from '../../assets/help-circle.svg'
import { HC } from '../Types'

interface FriendsHeaderProps {
  user: { displayName: string; userId: number }[]
}

/* 
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
*/

/*
	<form onSubmit={() => handleFriendRequest({ displayName, userId })}>
		<InputField label="Display Name" name="displayName" />
		<InputField label="User ID" name="userId" />
		<button type="submit">Send Friend Request</button>
	</form>
*/

const Header: React.FC<HC> = ({ handler }) => {
  const handleFriendRequest = (params: { displayName: string; userId: number }) => {}

  return (
    <section className="text-gray-400 my-4 flex justify-between items-center gap-2 text-lg w-full">
      <article className="flex items-center gap-8">
        <div className="flex gap-2 p-3">
          <Image src={Smile} alt="smiley-face" />
          Friends
        </div>
        <button onClick={() => handler.setOF}>
          <p className="hover:bg-gray-800 px-1 cursor-pointer ml-4">Online</p>
        </button>
        <button onClick={() => handler.setALL}>
          <p className="hover:bg-gray-800 px-1 cursor-pointer ml-4">All</p>
        </button>
        <button onClick={() => handler.setPF}>
          <p className="hover:bg-gray-800 px-1 cursor-pointer ml-4">Pending</p>
        </button>
        <button onClick={() => handler.setBF}>
          <p className="hover:bg-gray-800 px-1 cursor-pointer ml-4">Blocked</p>
        </button>
        <button onClick={() => handler.setADD}>
          <p className="text-green-500 hover:bg-gray-800 hover:text-green-600 px-1 cursor-pointer">
            Add Friend
          </p>
        </button>
      </article>
      <div className="flex gap-6 mr-6">
        <Image src={MessageSquare} alt="message-square" />
        <Image src={Inbox} alt="inbox" />
        <Image src={HelpCircle} alt="help-circle" />
      </div>
    </section>
  )
}

export default Header
