import React from 'react'
import Link from 'next/link'
import NavWrapper from './NavWrapper'

const Nav = () => {
  return (
    <NavWrapper>
      <Link href="/me">
        <a className="text-3xl hover:text-4xl transition-all">
          <span>👉</span>
        </a>
      </Link>
    </NavWrapper>
  )
}

export default Nav
