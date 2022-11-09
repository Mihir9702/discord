import React from 'react'
import Chat from '../components/Chat'
import { useFriendsQuery } from '../graphql'
import AddFriendModal from '../components/AddFriendModal'
import Friends from '../components/Friends'
import ServerNavigation from '../components/ServerNavigation'

// ! ServerNavigation's Add button is not working. No props, no state.
// * Will integrate state management for this later.

export default () => {
  const [{ data, fetching }] = useFriendsQuery()
  const [friendModal, setFriendModal] = React.useState(false)
  const [friendDisplay, setFriendDisplay] = React.useState(true)

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

  const handleClose = () => {
    setFriendModal(!friendModal)
  }

  return (
    <div className="max-w-8xl mx-auto bg-gray-900">
      <div className="fixed z-10 inset-0 -left-10 shadow-md right-auto px-8 overflow-y-auto">
        <ServerNavigation />
        <div className="bg-gray-900 z-20 inset-0 fixed left-20 ml-2 text-center text-gray-100 right-auto w-56 p-2 shadow-md overflow-y-auto">
          <button
            className="hover:bg-gray-800 selection:bg-gray-800 mt-4 w-full h-8 rounded-md cursor-pointer"
            onClick={() => setFriendDisplay(!friendDisplay)}
          >
            Friends
          </button>
          <hr className="my-4 border-gray-800 mx-auto" />
          <p className="text-left uppercase text-sm relative my-4">
            Direct Messages
            <button
              className="absolute left-auto right-0 cursor-pointer"
              onClick={() => setFriendModal(!friendModal)}
            >
              ➕
            </button>
          </p>
          {friendModal && <AddFriendModal handleClose={handleClose} />}
          <div className="flex flex-col">{body}</div>
        </div>
        {friendDisplay ? <Friends /> : <Chat />}
      </div>
    </div>
  )
}
