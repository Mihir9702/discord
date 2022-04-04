import React from 'react'
import Nav from '@components/Nav'
import { NextPage } from 'next'
import { useSignupMutation } from '../generated/graphql'
import { useRouter } from 'next/router'

const Signup: NextPage = () => {
  const [inputs, setInputs] = React.useState({ name: '', username: '', password: '' })
  const [usernameError, setUsernameError] = React.useState(0)
  const [passwordError, setPasswordError] = React.useState(0)
  const [, signup] = useSignupMutation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ** Validation Checking OFF **
    // if (inputs.username.length < 3) {
    //   setUsernameError(2)
    // }

    // if (inputs.password.length < 8) {
    //   setPasswordError(2)
    // }

    const response = await signup(inputs)

    console.log(response)
    if (response.data?.signup.id) {
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
          <h2 className="text-2xl font-bold">Signup</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-10">
              <label htmlFor="name" className="block mt-8 p-1">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  className="mt-0 outline-none block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                  name="name"
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </label>
              <label htmlFor="username" className="block">
                <span className="text-gray-700">Username</span>
                <input
                  type="text"
                  className={`mt-0 outline-none block w-full p-2 border-${usernameError} border-b-2 border-red-600 border-b-gray-200 focus:ring-0 focus:border-black`}
                  name="username"
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </label>
              <label htmlFor="password" className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="text"
                  className={`mt-0 outline-none block w-full p-2 border-${passwordError} border-b-2 border-red-600 border-b-gray-200 focus:ring-0 focus:border-black`}
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

export default Signup
