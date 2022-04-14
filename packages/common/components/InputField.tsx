import React, { FC, InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
}

const InputField: FC<InputFieldProps> = (props) => {
  return (
    <>
      <label className="block text-gray-300 text-sm font-bold mb-2 w-64" htmlFor={props.name}>
        {props.label}
        <input
          {...props}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
    </>
  )
}

export default InputField
