import React from 'react'
import Create from './Create'
import Join from './Join'
import Menu from './Menu'

export type Display = 'menu' | 'create' | 'join'

const AddServer = () => {
  const [display, setDisplay] = React.useState<Display>('menu')

  const setMenu = () => {
    setDisplay('menu')
  }

  return (
    <div className="flex justify-center items-center h-max w-max">
      <div className="px-32 py-32 rounded-lg bg-gray-100 opacity-100 text-2xl text-black flex flex-col items-center">
        <p>This is where the magic happens!!! 🎉</p>
        {display === 'menu' ? (
          <Menu setDisplay={setDisplay} />
        ) : display === 'create' ? (
          <Create menu={setMenu} />
        ) : display === 'join' ? (
          <Join menu={setMenu} />
        ) : null}
      </div>
    </div>
  )
}

export default AddServer
