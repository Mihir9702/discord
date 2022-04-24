import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const UserDisplay = () => {
  const user = useContext(UserContext)

  return (
    <div className="bg-background absolute bottom-0 p-4 w-full left-0 flex">
      {user?.displayName}
    </div>
  )
}

export default UserDisplay
