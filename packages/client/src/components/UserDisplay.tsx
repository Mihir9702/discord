import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const UserDisplay = () => {
  const user = useContext(UserContext)

  return (
    <div className="bg-background absolute bottom-0 p-4 w-full left-0 flex justify-evenly items-center">
      <span className="p-4 bg-dark rounded-full" />
      <h1>{user?.displayName}</h1>
      <span className="hover:text-gray-50 cursor-default">&#9959;</span>
    </div>
  )
}

export default UserDisplay
