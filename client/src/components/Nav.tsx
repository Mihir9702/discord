import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import NavWrapper from './NavWrapper'

const Nav = () => {
  const [display, setDisplay] = useState('hidden')
  const [menu, setMenu] = useState(false)

  // useLogoutMutation
  const [, logout] = useLogoutMutation()
  const handleLogout = async () => {
    await logout()
  }

  // User is not logged in
  // get the cookie named 'dyx' and check if it's empty
  // if it's empty, then the user is not logged in

  // return (
  //   <NavWrapper>
  //     <>
  //       <Link href="/signup">
  //         <a className="text-gray-900 hover:text-gray-400">
  //           <span className="text-xl">Signup</span>
  //         </a>
  //       </Link>
  //       <Link href="/login">
  //         <a className="text-gray-900 hover:text-gray-400">
  //           <span className="text-xl p-2 px-3">Login</span>
  //         </a>
  //       </Link>
  //     </>
  //   </NavWrapper>
  // )
  return (
    <NavWrapper>
      <Link href="/me">
        <a className="text-gray-900 hover:text-gray-400">
          <span className="text-xl p-2 px-3">👉 Go to main</span>
        </a>
      </Link>
    </NavWrapper>
  )
}

export const MenuIcon: React.FC = () => {
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

export const CloseIcon: React.FC = () => {
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
