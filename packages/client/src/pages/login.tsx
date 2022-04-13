import React from 'react'
import Link from 'next/link'
import InputField from 'src/tools/components/InputField'
import { useRouter } from 'next/router'
import { Input, useLoginMutation } from 'src/tools/generated/graphql'

export default () => {
  const [params, setParams] = React.useState<Input>({
    username: '',
    password: '',
  })
  const [error, setError] = React.useState<string | undefined>(undefined)

  const router = useRouter()

  const [, login] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await login({
      params,
    })

    if (response.error) {
      setError(response.error?.graphQLErrors[0].message)
    } else {
      router.push('/home')
    }
  }

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-8 rounded-xl shadow-lg py-12 flex flex-col items-center gap-6 text-gray-300"
      >
        <h1 className="font-bold text-2xl text-gray-200">Login</h1>
        {error && <p className="text-red-500 py-4">{error}</p>}
        <InputField
          name={params.username}
          label="Username"
          type="text"
          onChange={(e) => setParams({ ...params, username: e.target.value })}
        />
        <InputField
          name={params.password}
          label="Password"
          type="password"
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />
        <Link href={'/signup'}>
          <a className="text-blue-400 hover:underline">Signup</a>
        </Link>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </main>
  )
}
