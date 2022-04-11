import React from "react";
import Link from "next/link";
import InputField from "renderer/src/components/InputField";
import { useRouter } from "next/router";
import { Input, useSignupMutation } from "renderer/src/generated/graphql";

export default () => {
  const [, signup] = useSignupMutation();
  const router = useRouter();
  const [params, setParams] = React.useState<Input>({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("params", params);
    const response = await signup({ params });
    console.log("response", response);

    if (response.error) {
      setError(response.error?.graphQLErrors[0].message);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 text-gray-300 flex flex-col items-center gap-6 p-6 rounded-xl shadow-lg"
      >
        <h1 className="my-4 font-bold text-2xl text-gray-50">Signup</h1>
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
        <Link href={"/login"}>
          <a className="text-blue-400 hover:underline">Login</a>
        </Link>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Signup
        </button>
      </form>
    </main>
  );
};
