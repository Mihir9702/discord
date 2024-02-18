import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import {
  Input,
  LoginDocument,
  LoginMutation,
  SignupDocument,
  SignupMutation,
  UserDocument,
  UserQuery,
} from "src/graphql";
import Loader from "../Loader";
import Login from "./Login";
import Signup from "./Signup";

interface AuthProps {
  title: string;
  children: React.ReactNode;
}

export { Login, Signup };
export default ({ title, children }: AuthProps) => {
  const args = { username: "", password: "" };
  const [params, setParams] = useState<Input>(args);

  const [signup] = useMutation<SignupMutation>(SignupDocument);
  const [login] = useMutation<LoginMutation>(LoginDocument);

  const { data, loading } = useQuery<UserQuery>(UserDocument);
  const user = data?.user;

  if (loading) return <Loader />;
  else if (user) {
    useRouter().push("/@me");
  }

  async function Authenticate(e: any) {
    e.preventDefault();

    if (title === "Signup") {
      await signup({ variables: { params } });
    } else if (title === "Login") {
      await login({ variables: { params } });
    }

    location.reload();
  }

  return (
    <main className="flex justify-center items-center w-full h-screen bg-image">
      <motion.div
        initial={{ translateY: -250, opacity: 0.5 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={Authenticate}
          className="bg-background text-gray-300 flex flex-col items-center gap-4 p-6 pb-12	 rounded shadow shadow-darkish h-fit relative"
        >
          <h1 className="my-4 font-bold text-2xl text-gray-50">{title}</h1>
          <div className="flex items-center relative uppercase">
            {/* <InputField
              name={params.username}
              label="Username"
              type="text"
              className="text-xs"
              onChange={(e) =>
                setParams({ ...params, username: e.target.value })
              }
            /> */}
            <label
              htmlFor={params.username}
              className="text-xs font-bold min-w-[300px] uppercase text-gray-400"
            >
              <div className="flex w-full gap-1">
                Username
                <div className="text-red-500">*</div>
              </div>
              <input
                name={params.username}
                type="text"
                className="shadow appearance-none border border-background rounded w-full py-2 px-3 text-gray-200 bg-lightdark leading-tight focus:outline-none focus:shadow-outline font-semibold text-xs"
                onChange={(e) =>
                  setParams({ ...params, username: e.target.value })
                }
              />
            </label>
          </div>

          <label
            htmlFor={params.username}
            className="text-xs font-bold min-w-[300px] uppercase text-gray-400"
          >
            <div className="flex w-full gap-1 font-bold">
              Password
              <div className="text-red-500">*</div>
            </div>
            <input
              name={params.password}
              type="password"
              className="shadow appearance-none border border-background rounded w-full py-2 px-3 text-gray-200 bg-lightdark leading-tight focus:outline-none focus:shadow-outline font-semibold text-xs"
              onChange={(e) =>
                setParams({ ...params, password: e.target.value })
              }
            />
          </label>
          {children}
        </form>
      </motion.div>
    </main>
  );
};
