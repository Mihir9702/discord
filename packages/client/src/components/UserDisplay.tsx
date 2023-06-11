import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const UserDisplay = () => {
  const user = useContext(UserContext)

  if (!user) {
    return <div></div>
  }

  return (
    <div className="bg-background p-2 mt-6 rounded-lg">
      <div className="flex-1 text-left pl-4 text-gray-300 flex gap-4 items-center">
        <span className="p-4 bg-orange-600 rounded-full" />
        <h1 className="text-md">
          {user.displayName}#{user.userId}
        </h1>
      </div>
    </div>
  )
}

export default UserDisplay
