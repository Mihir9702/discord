import React from "react";
import { motion } from "framer-motion";
import { Gear, PlusCircle, PlusUser, ChevronDown20 } from "../Icons";
import { DispatchBool, DispatchString } from "src/types/dispatch";

interface Props {
  menuOpts: boolean;
  setMenu: DispatchBool;
  setMenuOpt: DispatchString;
  setMenuOpts: DispatchBool;
}

const ChevronDown = ChevronDown20;

const itemsAllowed = ["Invite People", "Server Settings", "Create Channel"];
const items = [
  // "Server Boost",
  "Invite People",
  // "Invite a Guest",
  "Server Settings",
  "Create Channel",
  // "Create Category",
  // "Create Event",
  // "App Directory",
  // ------------------
  // "Notification Settings",
  // "Privacy Settings",
  // ------------------
  // "Edit Server Profile",
  // "Hide Muted Channels",
  // ------------------
  // "Report Raid",
];

export default ({ menuOpts, setMenu, setMenuOpt, setMenuOpts }: Props) => {
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
      {items.map((item, index) => (
        <div key={index} className="relative w-full justify-start">
          <button
            disabled={!itemsAllowed.includes(item)}
            onClick={() => {
              setMenu(false);
              setMenuOpt(item);
              setMenuOpts(!menuOpts);
            }}
            className={`
              p-1.5
          ${index === 1 && "text-[#959cf7] hover:text-white"}
          ${
            item === "Report Raid" &&
            "text-[#f23f42] hover:bg-[#f23f42] hover:text-white"
          }
          ${
            !itemsAllowed.includes(item) &&
            "line-through hover:text-gray-300 hover:bg-transparent cursor-not-allowed"
          }
          text-gray-300
          hover:text-white
          hover:font-normal
           hover:bg-lightblue
            w-full h-full rounded
            select-none text-md whitespace-nowrap font-light 
            flex justify-self-start
          `}
          >
            {item}
            <span className="absolute right-2">
              {item === "Invite People" && PlusUser}
              {item === "Server Settings" && Gear}
              {item === "Create Channel" && PlusCircle}
              {!itemsAllowed.includes(item) && ChevronDown}
            </span>
          </button>

          {index === 0 && <hr className="w-full border-dash my-1" />}
          {index === 7 && <hr className="w-full border-dash my-1" />}
          {index === 9 && <hr className="w-full border-dash my-1" />}
          {index === 11 && <hr className="w-full border-dash my-1" />}
        </div>
      ))}
    </motion.section>
  );
};
