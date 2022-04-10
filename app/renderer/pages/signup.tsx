import React from "react";
import InputField from "../src/components/InputField";
import { useSignupMutation, SignupInput } from "../src/generated/graphql";
import { useRouter } from "next/router";

export default () => {
  const [, signup] = useSignupMutation();
  const router = useRouter();
  const [params, setParams] = React.useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = React.useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("params", params);
    // @ts-ignore
    const response = await signup(params);
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
