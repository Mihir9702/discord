import React from 'react'
import { useFriendRequestsQuery } from '../../graphql'
import Accept from './Accept'
import Decline from './Decline'

// ! this will be scrapped for a better ui design

const Friends = () => {
  const [{ data }] = useFriendRequestsQuery()

  return (
    <div className="home-chat-background z-10 inset-0 fixed left-72 ml-6 text-center text-gray-100 shadow-md right-auto overflow-y-auto">
      <div className="bg-blue-900 flex flex-col z-20 inset-0 top-auto mx-auto">
        <div className="w-screen absolute left-0 bg-background">
          {data?.user?.friendRequests?.map((fr) => (
            <div
              className="flex items-center gap-x-12 text-center bg-background hover:bg-gray-800 p-2 rounded-md"
              key={fr.id}
            >
              <div className="bg-gray-500 p-4 rounded-full" />
              <span>DisplayName</span>

              <Accept fr={fr} />
              <Decline fr={fr} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Friends
