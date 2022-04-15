import React from 'react'
import InputField from '../components/InputField'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLoginMutation } from 'packages/controller/dist/generated/graphql'
import { Input } from 'packages/controller/dist/generated/graphql'

const Login: NextPage = () => {
  const [params, setParams] = React.useState<Input>({ username: '', password: '' })
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
      router.push('/')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col justify-center items-center my-64 gap-8 w-full"
    >
      <h1>Login</h1>
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
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>
  )
}

export default Login
