import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

// ! Hydration error when getting user context

const UserDisplay = () => {
  const user = useContext(UserContext)

  if (!user) {
    return <div></div>
  }

  return (
    <div className="bg-background absolute bottom-0 p-4 w-full left-0 flex justify-evenly items-center">
      <span className="p-4 bg-dark rounded-full" />
      <div className="flex-1 text-left pl-4">
        <h1 className="text-sm">{user.displayName}</h1>
        <h2 className="text-sm">#{user.userId}</h2>
      </div>
    </div>
  )
}

export default UserDisplay
