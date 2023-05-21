import React from 'react'
import { useFriendsQuery, useUserQuery } from '../graphql'
import ServerNavigation from '../components/ServerNavigation'
import Search from '../components/Search'
import UserMidOptions from '../components/UserMidOptions'
import { RegularSkeleton, UserSkeleton } from '../components/Skeleton'
import ThirdSection from '../components/ThirdSection'
import UserDisplay from '../components/UserDisplay'
import { UserContext } from '../UserContext'

// Todo: friendRequest (null) | addFriend (returning but not updating) ** kinda updating but shows null

export default () => {
  const [{ data, fetching }] = useFriendsQuery()
  const [friendModal, setFriendModal] = React.useState(false)
  const [friendDisplay, setFriendDisplay] = React.useState(true)

  const [{ data: userQuery }] = useUserQuery()

  const uq = userQuery?.user

  const states = {}

  let body: any = ''

  if (fetching) {
    body = 'Loading...'
  } else if (data?.user?.friends) {
    body = data.user?.friends.map((friend) => {
      return (
        <div
          className="flex items-center gap-x-12 text-center hover:bg-gray-800 p-2 rounded-md"
          key={friend.id}
        >
          <div className="bg-gray-500 p-4 rounded-full" />
          <span>{friend.displayName}</span>
        </div>
      )
    })
  } else {
    body = 'No friends'
  }

  return (
    <UserContext.Provider value={uq}>
      <main className="flex h-screen">
        {/* FIRST SECTION */}
        <section className="bg-gray-900 w-[100px]">
          <ServerNavigation />
        </section>

        {/* SECOND SECTION */}
        <section className="w-[280px] mx-4 flex flex-col">
          <Search />
          <UserMidOptions />
          <RegularSkeleton />
          <UserDisplay />
        </section>

        {/* THIRD SECTION */}
        <section className="w-full flex flex-col">
          <ThirdSection />
          <div className="flex flex-col gap-[1.5rem] mt-6">
            <div className="flex flex-col text-gray-400 mx-4 gap-2">
              <h1>ADD FRIEND</h1>
              <p>You can add a friend using their Imari Tag. It'S CaSe SeNsItIvE</p>
              <form>
                <input
                  className="w-96 px-3 py-2 bg-background rounded-xl focus:outline-0"
                  type="text"
                  placeholder="Username#0000"
                />
              </form>
            </div>
            <div className="flex flex-col text-gray-400 mx-4 gap-4">
              <h1>ACTIVE NOW</h1>
              <UserSkeleton />
            </div>
          </div>
        </section>
        {/* Add it here and change to component later */}
      </main>
    </UserContext.Provider>
  )
}
