import React, { FC, InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  required?: boolean
}

const InputField: FC<InputFieldProps> = (props) => {
  return (
    <>
      <label className="block text-gray-400 text-sm font-bold mb-2 w-64" htmlFor={props.name}>
        {props.label} {props.required && <span className="text-red-600">*</span>}
        <input
          {...props}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
    </>
  )
}

export default InputField
