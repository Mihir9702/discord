import React from "react";
import InputField from "./InputField";

// * This is a custom component that will be used to handle user account forms
// ! This is currently not used, but will be used in the future
const Form: React.FC = ({ error, params, setParams }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default Form;
