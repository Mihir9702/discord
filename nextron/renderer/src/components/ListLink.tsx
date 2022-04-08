import Link from 'next/link'
import React from 'react'

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

export default ListLink
