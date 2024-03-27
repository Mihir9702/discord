import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { UserQuery, UserDocument } from "src/graphql";
import { useRouter } from "next/router";
import Loader from "../Loader";
import Options from "./Options";
import MyAccount from "./MyAccount";
import Profiles from "./Profiles";

interface Props {
  init: boolean;
  iinit: (init: boolean) => void;
}

export default ({ init, iinit }: Props) => {
  const { data, loading } = useQuery<UserQuery>(UserDocument);
  const user = data?.user;

  if (loading) return <Loader />;
  else if (!user) {
    useRouter().push("/login");
  }

  const nameId = user?.nameId!;
  const iconId = user?.iconId!;
  const status = user?.status!;

  const [option, setOption] = useState("myaccount");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 w-full h-screen flex justify-center items-center bg-background"
    >
      <article className="w-full h-full">
        <main className="w-full h-full flex items-start justify-between">
          <Options option={option} setOption={setOption} />

          <section className="py-2 border border-red-500 w-full h-full">
            {option == "MyAccount" && (
              <MyAccount nameId={nameId} iconId={iconId} status={status} />
            )}

            {option == "Profiles" && (
              <Profiles nameId={nameId} iconId={iconId} status={status} />
            )}
          </section>

          <section className="border h-full">
            <button
              className="w-max rounded-full m-14 hover:text-gray-400 cursor-pointer"
              onClick={() => iinit(!init)}
            >
              X
            </button>
          </section>
        </main>
      </article>
    </motion.div>
  );
};
