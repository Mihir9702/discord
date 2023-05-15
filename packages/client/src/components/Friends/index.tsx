import React from 'react'
import { useFriendRequestsQuery } from '../../graphql'
import Accept from './Accept'
import Decline from './Decline'
import Header from './Header'

// ! this will be scrapped for a better ui design / icons

const Friends = () => {
  const [{ data }] = useFriendRequestsQuery()

  return (
    <div className="w-max text-text overflow-y-scroll">
      <div className="flex flex-col z-20 top-auto">
        <div className="bg-background ">
          <Header />
          {data?.user &&
            data.user.friendRequests?.map((fr) => (
              <div
                className="flex items-center justify-around gap-x-8 text-center bg-background hover:bg-gray-800 p-4 rounded-md"
                key={fr.userId}
              >
                <div className="bg-gray-500 p-4 rounded-full" />
                <span>{fr.displayName}</span>

                <div className="flex gap-6">
                  <Accept fr={fr} />
                  <Decline fr={fr} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default Friends
