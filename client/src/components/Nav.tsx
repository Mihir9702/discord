import React, { useState } from 'react'
import Link from 'next/link'
import logo from '@assets/logo.svg'
import Image from 'next/image'

const Nav = () => {
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
        <ListLink href="/downlaod" text="Download" />
        <ListLink href="/about" text="About" />
        <ListLink href="/projects" text="Projects" />
        <ListLink href="/roadmap" text="Roadmap" />
        <ListLink href="/contact" text="Contact" />
      </ul>
      {/* Two links signup / login */}
      <div className={`text-center ${display} lg:flex justify-end items-center`}>
        <div className="flex flex-col lg:flex-row gap-6">
          <Link href="/signup">
            <a className="text-gray-900 hover:text-gray-400">
              <span className="text-xl">Signup</span>
            </a>
          </Link>
          <Link href="/login">
            <a className="text-gray-900 hover:text-gray-400">
              <span className="text-xl p-2 px-3">Login</span>
            </a>
          </Link>
        </div>
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

interface ListLink {
  href: string
  text: string
}

const ListLink: React.FC<ListLink> = ({ href, text }) => {
  return (
    <li className="mx-4 my-6 cursor-pointer lg:my-0 text-gray-900 hover:text-gray-400">
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  )
}

const MenuIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      width="32"
      height="32"
    >
      <title>Menu</title>
      <path
        fill="#000"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M80 160h352M80 256h352M80 352h352"
      />
    </svg>
  )
}

const CloseIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      width="32"
      height="32"
    >
      <title>Close</title>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  )
}

export default Nav
