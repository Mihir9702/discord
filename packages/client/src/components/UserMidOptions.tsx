import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Smile from '../assets/smile.svg'
import Box from '../assets/box.svg'

export default () => {
  return (
    <div className="flex flex-col mt-8 gap-6 ml-7 w-[80%] text-gray-400">
      <Link href="/friends">
        <a className="flex gap-6 p-3 rounded-md hover:bg-gray-900">
          <Image src={Smile} alt="smiley-face" />
          Friends
        </a>
      </Link>
      <Link href="/remix">
        <a className="flex gap-6 p-3 rounded-md hover:bg-gray-900">
          <Image src={Box} alt="box" />
          Remix
        </a>
      </Link>
    </div>
  )
}
