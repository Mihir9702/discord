import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Smile from '../assets/smile.svg'
import Cube from '../assets/cube.svg'

export default () => {
  const link = {
    friends: (
      <Link href="/friends">
        <a className="flex gap-6 p-3 rounded-md hover:bg-gray-900">
          <Image src={Smile} alt="smiley-face" />
          Friends
        </a>
      </Link>
    ),
    remix: (
      <Link href="/remix">
        <a className="flex gap-6 p-3 rounded-md hover:bg-gray-900">
          <Image src={Cube} alt="box" />
          Remix
        </a>
      </Link>
    ),
    dms: (
      <div className="flex justify-between items-center text-gray-400 hover:text-gray-200">
        <p className="my-5">DIRECT MESSAGES</p>
        <p className="cursor-pointer">➕</p>
      </div>
    ),
  }

  return (
    <div className="flex flex-col mt-8 gap-6 ml-3 w-[90%] text-gray-400">
      {link.friends}
      {link.remix}
      {link.dms}
    </div>
  )
}
