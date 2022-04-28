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
    <button className="bg-blue-500 p-2 rounded-md" onClick={() => acceptFR(fr)}>
      Accept
    </button>
  )
}

export default Accept
