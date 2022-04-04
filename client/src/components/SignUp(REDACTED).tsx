import React from 'react'
import { NextPage } from 'next'
import Nav from '@components/Nav'

const SignUp: NextPage = () => {
  const [steps, setSteps] = React.useState(0)
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    console.log('Submitted')
  }

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl">Signup</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <Steps steps={steps} />
          <div className="flex justify-center gap-8 my-8">
            <button
              type="button"
              onClick={() => setSteps(steps !== 0 ? steps - 1 : steps)}
              className="bg-blue-200 px-8 py-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setSteps(steps !== 3 ? steps + 1 : steps)}
              className="bg-blue-500 px-8 py-2"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

const Steps = (props: { steps: number }) => {
  console.log(props.steps)

  switch (props.steps) {
    case 0:
      return <FirstStep />
    case 1:
      return <SecondStep />
    default:
      return <FirstStep />
  }
}

interface DisplayStep {
  step: React.ReactElement
  steps: number
  setSteps: React.Dispatch<React.SetStateAction<number>>
}

const FirstStep: React.FC = () => {
  return (
    <label className="text-lg">
      <span className="text-gray-700">First Name</span>
      <input className="border border-gray-400 p-2 w-full" type="text" />
    </label>
  )
}
const SecondStep: React.FC = () => {
  return (
    <label className="text-lg">
      <span className="text-gray-700">Last Name</span>
      <input className="border border-gray-400 p-2 w-full" type="text" />
    </label>
  )
}

export default SignUp
