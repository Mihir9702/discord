import React from 'react'
import { useUserQuery } from '../graphql'
import { useRouter } from 'next/router'
import Link from 'next/link'

// * Rough layout of Home page
export default () => {
  const [{ data, fetching }] = useUserQuery()
  let main: JSX.Element | null = null
  const router = useRouter()

  if (fetching) main = <div>Loading...</div>
  else if (!data?.user) {
    router.push('/login')
  } else router.push('/home')

  main = (
    <>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
    </>
  )

  return main
}
