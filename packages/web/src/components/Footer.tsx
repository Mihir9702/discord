import Link from 'next/link'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-400 text-text p-12 flex justify-center">
      <div className="flex w-full justify-end mr-16">
        <p className="text-xs">
          © {new Date().getFullYear()}
          {` `}
          <Link href={'https://github.com/Mihir9702'}>
            <a className="text-blue-500 hover:underline cursor-pointer">Mihir</a>
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
