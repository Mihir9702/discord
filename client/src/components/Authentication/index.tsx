import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  Input,
  LoginDocument,
  LoginMutation,
  SignupDocument,
  SignupMutation,
} from "src/graphql";
import Loader from "../Loader";
import Login from "./Login";
import Signup from "./Signup";
import { safeNext, useMe } from "src/utils/useMe";

interface AuthProps {
  title: string;
  children: React.ReactNode;
}

export { Login, Signup };
export default ({ title, children }: AuthProps) => {
  const router = useRouter();
  const args = { username: "", password: "" };
  const [params, setParams] = useState<Input>(args);
  const [error, setError] = useState("");

  const [signup, { loading: signingUp }] =
    useMutation<SignupMutation>(SignupDocument);
  const [login, { loading: loggingIn }] =
    useMutation<LoginMutation>(LoginDocument);

  const { me, loading } = useMe();
  const next = safeNext(router.query.next);

  // already signed in
  useEffect(() => {
    if (me) router.replace(next);
  }, [me]);

  if (loading || me) return <Loader />;

  async function Authenticate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (title === "Signup") {
        await signup({ variables: { params } });
      } else if (title === "Login") {
        await login({ variables: { params } });
      }
      // full reload so the cache + live connection start fresh
      window.location.assign(next);
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  const input =
    "shadow appearance-none border border-background rounded w-full py-2 px-3 text-gray-200 bg-lightdark leading-tight focus:outline-none focus:shadow-outline font-semibold text-xs normal-case";

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
          {error && (
            <p className="text-sm text-red-400 max-w-[300px] text-center font-normal">
              {error}
            </p>
          )}
          <div className="flex items-center relative uppercase">
            <label
              htmlFor="username"
              className="text-xs font-bold min-w-[300px] uppercase text-gray-400"
            >
              <div className="flex w-full gap-1">
                Username
                <div className="text-red-500">*</div>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                autoFocus
                required
                value={params.username}
                className={input}
                onChange={(e) =>
                  setParams({ ...params, username: e.target.value })
                }
              />
            </label>
          </div>

          <label
            htmlFor="password"
            className="text-xs font-bold min-w-[300px] uppercase text-gray-400"
          >
            <div className="flex w-full gap-1 font-bold">
              Password
              <div className="text-red-500">*</div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                title === "Signup" ? "new-password" : "current-password"
              }
              required
              value={params.password}
              className={input}
              onChange={(e) =>
                setParams({ ...params, password: e.target.value })
              }
            />
          </label>
          <fieldset disabled={signingUp || loggingIn} className="w-full">
            {children}
          </fieldset>
        </form>
      </motion.div>
    </main>
  );
};
