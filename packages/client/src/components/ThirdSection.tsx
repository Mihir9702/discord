import React from 'react'
import Header from './Friends/Header'
import { useFriendsQuery } from '../graphql'

export default () => {
  const [onlineFriends, setOnlineFriends] = React.useState(false)
  const [allFriends, setAllFriends] = React.useState(false)
  const [pending, setPendingFriends] = React.useState(false)
  const [blocked, setBlockedFriends] = React.useState(false)
  const [addFriends, setAddFriends] = React.useState(false)

  const stateHandler = {
    setOF: setOnlineFriends,
    setALL: setAllFriends,
    setPF: setPendingFriends,
    setBF: setBlockedFriends,
    setADD: setAddFriends,
  }

  const [{ data }] = useFriendsQuery()

  console.log([onlineFriends, allFriends, pending, blocked, addFriends])
  if (!data?.user?.friends) {
    return <Header handler={stateHandler} />
  }

  const friends = {
    online: data.user.friends.filter((user) => user.status === 'online'),
    all: data.user.friends,
    pending: data.user.friends.filter((user) => user.status === 'pending'),
    blocked: data.user.friends.filter((user) => user.status === 'blocked'),
  }

  return (
    <>
      <Header handler={stateHandler} />
      {onlineFriends &&
        friends.online &&
        friends.online.map(() => {
          return (
            <div className="bg-gray-900">
              {/* icon */}
              {/* name */}
              {/* mood? */}
              {/* status */}
            </div>
          )
        })}
      {allFriends &&
        friends.all.map(() => {
          return (
            <div className="bg-gray-900">
              {/* icon */}
              {/* name */}
              {/* mood? */}
              {/* status */}
            </div>
          )
        })}
      {pending &&
        friends.pending.map(() => {
          return (
            <div className="bg-gray-900">
              {/* icon */}
              {/* name */}
              {/* mood? */}
              {/* status */}
            </div>
          )
        })}
      {blocked &&
        friends.blocked.map(() => {
          return (
            <div className="bg-gray-900">
              {/* icon */}
              {/* name */}
              {/* mood? */}
              {/* status */}
            </div>
          )
        })}
      {/* {addFriends && (
      )} */}
    </>
  )
}
