import React, { FC, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export default (props: InputFieldProps) => {
  return (
    <label
      className="block text-gray-300 text-sm font-bold mb-2 w-full"
      htmlFor={props.name}
    >
      {props.label}
      <input
        {...props}
        className={`shadow appearance-none border border-background rounded w-full py-2 px-3 text-md text-gray-200 bg-lightdark leading-tight focus:outline-none focus:shadow-outline font-semibold ${props.className}`}
      />
    </label>
  );
};
