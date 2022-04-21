import React from 'react'
import UserDisplay from './UserDisplay'

const MidColContent = () => {
  return (
    <div className="bg-gray-900 z-20 inset-0 fixed left-20 ml-2 text-center text-text shadow-md right-auto px-28 overflow-y-auto">
      <UserDisplay />
    </div>
  )
}

export default MidColContent
