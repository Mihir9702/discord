import React from 'react'
import Modal from './Modal'
import { useSendFriendRequestMutation } from '../graphql'

interface AddFriendModalProps {
  handleClose: () => void
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({ handleClose }) => {
  const [input, setInput] = React.useState<string>('')

  const [, addFriend] = useSendFriendRequestMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      displayName: input.split('#')[0],
      userId: Number(input.split('#')[1]),
    }

    await addFriend({ params })

    handleClose()
  }

  return (
    <Modal handleClose={handleClose}>
      <div className="flex flex-col w-max bg-background p-8 rounded-lg items-center gap-6">
        <h1 className="text-xl whitespace-nowrap">Add Friends</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full bg-indigo-500 placeholder:text-dark outline-none rounded-md text-dark p-2 text-center"
            type="text"
            placeholder="name#1234"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </Modal>
  )
}

export default AddFriendModal
