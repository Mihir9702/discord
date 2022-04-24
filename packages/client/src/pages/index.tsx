import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUserQuery } from '../graphql'

export default () => {
  const [{ data, fetching }] = useUserQuery()
  let body: JSX.Element | null = null
  const router = useRouter()

  if (fetching) body = <div>Loading...</div>
  else if (!data?.user) {
    router.push('/login')
  } else router.push('/home')

  return (
    <nav className="text-white">
      {body ? (
        body
      ) : (
        <ul>
          <li>
            <Link href="/home">
              <a className="hover:underline">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a className="hover:underline">Login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a className="hover:underline">Signup</a>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
