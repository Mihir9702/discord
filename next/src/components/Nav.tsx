import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import NavWrapper from './NavWrapper'

const Nav = () => {
  const [] = useState('hidden')
  const [] = useState(false)

  // useLogoutMutation
  const [, logout] = useLogoutMutation()
  const handleLogout = async () => {
    await logout()
  }
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

export default Nav
