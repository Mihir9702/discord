import React from 'react'
import { FriendInput, useAcceptFriendRequestMutation } from '../../graphql'

const Accept = ({ fr }: { fr: FriendInput }) => {
  const [, accept] = useAcceptFriendRequestMutation()

  const acceptFR = async (fr: FriendInput) => {
    const params = {
      displayName: fr.displayName,
      userId: fr.userId,
    }

    const response = await accept({ params })

    if (response.error) {
      throw new Error(response.error.message)
    }

    console.log(response)
  }

  return (
    <button
      className="border-2 border-green-500 p-2 rounded-full hover:bg-green-400 transition-all"
      onClick={() => acceptFR(fr)}
    >
      ✔
    </button>
  )
}

export default Accept
