import React from 'react'
import AddServer from '../components/AddServer'
import Chat from '../components/Chat'
import MidColContent from '../components/MidColContent'
import Modal from '../components/Modal'
import ServerNavigation from '../components/ServerNavigation'
import { useUserQuery } from '../graphql'
import { UserContext } from '../UserContext'

export default () => {
  const [ds, setds] = React.useState(false)

  const [{ data }] = useUserQuery()

  const user = data?.user

  const handleClose = () => {
    setds(!ds)
  }

  return (
    <UserContext.Provider value={user}>
      <div className={`max-w-8xl mx-auto bg-gray-900`}>
        {ds && (
          <Modal handleClose={handleClose}>
            <AddServer />
          </Modal>
        )}
        <div className="fixed z-10 inset-0 -left-10 shadow-md right-auto px-8 overflow-y-auto">
          <ServerNavigation ds={ds} setds={setds} />
          <MidColContent />
          <Chat />
        </div>
      </div>
    </UserContext.Provider>
  )
}
