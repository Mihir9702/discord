import React from 'react'
import AddNavigation from './AddNavigation'
import HomeNavigation from './HomeNavigation'
import Servers from './Servers'

type Props = { ds?: boolean; setds?: any }

const ServerNavigation: React.FC<Props> = ({ ds, setds }) => {
  return (
    <nav className="mt-2 lg:text-sm z-20 lg:leading-6 p-5">
      <HomeNavigation />
      <hr className="border-gray-800 mt-3" />
      <Servers />
      <hr className="border-gray-800 mb-3" />
      <AddNavigation ds={ds} setds={setds} />
    </nav>
  )
}

export default ServerNavigation
