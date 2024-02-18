import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  init: boolean;
  iinit: (init: boolean) => void;
}

export default ({ init, iinit }: Props) => {
  const sidebar = {
    title: "text-xs font-semibold uppercase mx-4 mb-1 text-gray-400",
    item: "cursor-pointer hover:bg-highlight w-full text-start p-4 py-2 rounded text-gray-200",
    divider: "border-1 border-dash mx-4 my-1",
  };
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
          <section className="bg-mid w-80 h-full flex overflow-x-hidden">
            <hr className="sm:px-2 md:px-6 border-none" />
            <section className="w-full flex flex-col gap-2">
              <div className="w-full">
                <h1 className={sidebar.title + " mt-8"}>User Settings</h1>
                <h2 className={sidebar.item}>My Account</h2>
                <h2 className={sidebar.item}>Profiles</h2>
                <h2 className={sidebar.item}>Blocked</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>Billing Settings</h1>
                <h2 className={sidebar.item}>Remix</h2>
                <h2 className={sidebar.item}>Subscriptions</h2>
                <h2 className={sidebar.item}>Billing</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>App Settings</h1>
                <h2 className={sidebar.item}>Appearance</h2>
                <h2 className={sidebar.item}>Voice & Video</h2>
                <h2 className={sidebar.item}>Text & Images</h2>
                <h2 className={sidebar.item}>Notifications</h2>
                <hr className={sidebar.divider} />
                <h2 className={sidebar.item}>Logout</h2>
                <hr className={sidebar.divider} />
              </div>
            </section>
          </section>
          <section className="py-2 border border-red-500 w-full h-full"></section>
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
