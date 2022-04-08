import React from 'react'
import Search from './Search'
import Servers from './Servers'

const ServerNavigation: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 bg-dark">
      <div className="hidden lg:block fixed z-20 inset-0 top-12 left-12 right-auto w-[19.5rem] px-8 overflow-y-auto">
        <nav className="lg:text-sm lg:leading-6 relative">
          <Search />
          <Servers />
        </nav>
      </div>
    </div>
  )
}

export default ServerNavigation
