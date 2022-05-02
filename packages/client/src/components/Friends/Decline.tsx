import React from 'react'
import { FriendInput, useDeclineFriendRequestMutation } from '../../graphql'

const Decline = ({ fr }: { fr: FriendInput }) => {
  const [, decline] = useDeclineFriendRequestMutation()

  const declineFR = async (fr: FriendInput) => {
    const params = {
      displayName: fr.displayName,
      userId: fr.userId,
    }

    const response = await decline({ params })

    if (response.error) {
      throw new Error(response.error.message)
    }

    console.log(response)
  }

  return (
    <button
      className="p-2 border-2 border-red-500 rounded-full hover:bg-red-400 transition-all"
      onClick={() => declineFR(fr)}
    >
      ❌
    </button>
  )
}

export default Decline
