import React, { FC, JSXElementConstructor, ReactElement, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ListLink from './ListLink'
import logo from '../assets/logo.svg'
import { links } from './NavItems'
import { MenuIcon, CloseIcon } from './Icons'

interface NavProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>
}

const NavWrapper: FC<NavProps> = ({ children }) => {
  const [display, setDisplay] = useState('hidden')
  const [menu, setMenu] = useState(false)

  const handleMenuToggle = () => {
    setMenu(!menu)
    if (!menu) {
      setDisplay('block')
    } else {
      setDisplay('hidden')
    }
  }

  return (
    <nav className="z-10 p-5 py-12 shadow-lg lg:flex lg:inset-auto relative w-full lg:items-center">
      <div className="flex items-center">
        <div className="w-max">
          <Link href="/">
            <a className="flex justify-center items-center gap-4 text-gray-800 hover:text-gray-900">
              <div className="w-10">
                <Image src={logo} alt="logo" />
              </div>
              <span className="text-2xl font-bold">Imari</span>
            </a>
          </Link>
        </div>
      </div>
      <ul
        className={`${display} text-center text-xl relative w-full justify-center lg:flex lg:items-center`}
      >
        {links.map((link) => (
          <ListLink key={link.href} {...link} />
        ))}
      </ul>
      <div>{children}</div>
      <div className={`text-center ${display} lg:flex justify-end items-center`}>
        <div className="flex flex-col lg:flex-row gap-6"></div>
      </div>
      <button
        className="pointer absolute top-0 right-0 p-8 py-14 lg:hidden"
        onClick={handleMenuToggle}
      >
        {menu ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  )
}

export default NavWrapper
