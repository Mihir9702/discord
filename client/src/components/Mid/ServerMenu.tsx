import React from "react";
import { motion } from "framer-motion";
import { Gear, PlusCircle, PlusUser, LogOut, Trash } from "../Icons";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  manage: boolean;
  owner: boolean;
  setMenu: DispatchBool;
  open: (opt: string) => void;
}

// "Server Boost", "Invite a Guest", "Create Category", "Create Event",
// "App Directory", "Notification Settings", "Privacy Settings",
// "Edit Server Profile", "Hide Muted Channels", "Report Raid" - some day

export default ({ manage, owner, setMenu, open }: Props) => {
  const items = [
    { item: "Invite People", icon: PlusUser, show: true },
    { item: "Server Settings", icon: Gear, show: manage },
    { item: "Create Channel", icon: PlusCircle, show: manage },
    // the owner leaving takes the server with them
    {
      item: owner ? "Delete Server" : "Leave Server",
      icon: owner ? Trash : LogOut,
      show: true,
      danger: true,
    },
  ].filter((i) => i.show);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className={`
          bg-[#111214] rounded-lg
          absolute top-14 left-1.5 z-50
          w-56 h-max p-2 py-2.5 shadow-lg shadow-darkish
          `}
    >
      {items.map(({ item, icon, danger }, index) => (
        <div key={item} className="relative w-full justify-start">
          {danger && <hr className="w-full border-dash my-1" />}
          <button
            onClick={() => {
              setMenu(false);
              open(item);
            }}
            className={`
              p-1.5
          ${
            item === "Invite People"
              ? "text-[#959cf7] hover:text-white"
              : "text-gray-300"
          }
          ${
            danger
              ? "!text-[#f23f42] hover:!bg-[#f23f42] hover:!text-white"
              : "hover:bg-lightblue"
          }
          hover:text-white
          hover:font-normal
            w-full h-full rounded
            select-none text-md whitespace-nowrap font-light
            flex justify-self-start
          `}
          >
            {item}
            <span className="absolute right-2">{icon}</span>
          </button>

          {index === 0 && items.length > 2 && (
            <hr className="w-full border-dash my-1" />
          )}
        </div>
      ))}
    </motion.section>
  );
};
