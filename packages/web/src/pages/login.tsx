import React from 'react'
import InputField from '../components/InputField'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useLoginMutation } from '../graphql'
import { Input } from '../graphql'

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

  const header = (
    <div className="text-center flex flex-col gap-2 text-gray-400">
      <h1 className="text-xl">Login</h1>
      <h3 className="text-lg whitespace-nowrap">Testing my dev skills like Madara</h3>
    </div>
  )

  return (
    <section className="flex justify-center bg-[#181A1B] items-center my-52 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-8 bg-gray-800 p-8 rounded-xl"
      >
        {header}
        {error && <p className="text-red-500 py-4">{error}</p>}
        <InputField
          name={params.username}
          label="Username"
          type="text"
          required={true}
          onChange={(e) => setParams({ ...params, username: e.target.value })}
        />
        <InputField
          name={params.password}
          label="Password"
          type="password"
          required={true}
          onChange={(e) => setParams({ ...params, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default Login
