import React from 'react'
import { NextPage } from 'next'
import Nav from '@components/Nav'
import { useLoginMutation } from 'src/generated/graphql'
import { useRouter } from 'next/router'

interface Inputs {
  username: string
  password: string
}

const Login: NextPage = () => {
  const [inputs, setInputs] = React.useState<Inputs>({ username: '', password: '' })
  const [, login] = useLoginMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(inputs)

    const response = await login({ params: inputs })

    console.log(response)

    if (response.data?.login.id) {
      console.log('here')
      router.push('/')
    }
  }

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Nav />
        <form
          className="py-16 mt-16 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-10">
              <label htmlFor="username" className="block">
                <span className="text-gray-700">Username</span>
                <input
                  type="text"
                  className="mt-0 outline-none block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  name="username"
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </label>
              <label htmlFor="password" className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="text"
                  className="mt-0 outline-none block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  name="password"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
              </label>
              <button type="submit" className="bg-blue-600 text-white rounded-md p-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
