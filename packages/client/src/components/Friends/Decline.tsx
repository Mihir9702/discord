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
    <button className="bg-red-500 p-2 rounded-md" onClick={() => declineFR(fr)}>
      Decline
    </button>
  )
}

export default Decline
