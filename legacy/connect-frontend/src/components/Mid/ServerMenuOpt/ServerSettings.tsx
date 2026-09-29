import React from "react";
import { ServerMenuOptFC } from ".";
import { motion } from "framer-motion";

export default ({ onClose }: ServerMenuOptFC) => {
  const sidebar = {
    title: "text-sm uppercase mx-4 mb-1 text-gray-400",
    item: "cursor-pointer hover:bg-highlight w-full text-start p-4 py-2 text-md rounded text-gray-200",
    divider: "border-1 border-dash mx-4 my-1",
  };

  // *** refactor
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-background"
    >
      <article className="w-full h-full font-light">
        <main className="w-full h-full flex items-start justify-between">
          <section className="bg-mid w-80 h-full flex overflow-x-hidden">
            <hr className="sm:px-2 md:px-6 border-none" />
            <section className="w-full flex flex-col gap-2">
              <div className="w-full">
                <h1 className={sidebar.title + " mt-8"}>Server Name</h1>
                <h2 className={sidebar.item}>Overview</h2>
                <h2 className={sidebar.item}>Roles</h2>
                <h2 className={sidebar.item}>Emoji</h2>
                <h2 className={sidebar.item}>Stickers</h2>
                <h2 className={sidebar.item}>Soundboard</h2>
                <h2 className={sidebar.item}>Widget</h2>
                <h2 className={sidebar.item}>Server Template</h2>
                <h2 className={sidebar.item}>Custom Invite Link</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>Apps</h1>
                <h2 className={sidebar.item}>Clyde</h2>
                <h2 className={sidebar.item}>Integrations</h2>
                <h2 className={sidebar.item}>App Directory</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>Moderation</h1>
                <h2 className={sidebar.item}>Safety Setup</h2>
                <h2 className={sidebar.item}>AutoMod</h2>
                <h2 className={sidebar.item}>Audit Log</h2>
                <h2 className={sidebar.item}>Bans</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>Community</h1>
                <h2 className={sidebar.item}>Enable Community</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>Monetization</h1>
                <h2 className={sidebar.item}>Server Subscriptions</h2>
                <hr className={sidebar.divider} />
                <h2 className={sidebar.item}>Server Boost Status</h2>
                <hr className={sidebar.divider} />
              </div>
              <div className="w-full">
                <h1 className={sidebar.title}>User Management</h1>
                <h2 className={sidebar.item}>Members</h2>
                <h2 className={sidebar.item}>Invites</h2>
                <hr className={sidebar.divider} />
                <h2 className={sidebar.item}>Delete Server</h2>
              </div>
            </section>
          </section>
          <section className="py-2 border border-red-500 w-full h-full"></section>
          <section className="border h-full">
            <button
              className="w-max rounded-full m-14 text-gray-200 hover:text-gray-400 cursor-pointer"
              onClick={onClose}
            >
              X
            </button>
          </section>
        </main>
      </article>
    </motion.div>
  );
};
