import React from "react";
import { LogOut } from "../Icons";

export type Option = "MyAccount" | "Profiles" | "Blocked";

interface Options {
  option: Option;
  setOption: (option: Option) => void;
  onLogout: () => void;
}

export default ({ option, setOption, onLogout }: Options) => {
  const sidebar = {
    title: "text-xs font-semibold uppercase mx-4 mb-1 text-gray-400",
    item: "cursor-pointer hover:bg-highlight w-full text-start p-4 py-2 rounded text-gray-200",
    soon: "w-full text-start p-4 py-2 rounded text-gray-200 opacity-40 cursor-not-allowed",
    divider: "border-1 border-dash mx-4 my-1",
  };

  const item = (key: Option, label: string) => (
    <h2
      className={`${sidebar.item} ${
        option === key ? "bg-highlight text-white" : ""
      }`}
      onClick={() => setOption(key)}
    >
      {label}
    </h2>
  );

  const soon = (label: string) => (
    <h2 className={sidebar.soon} title="Coming soon">
      {label}
    </h2>
  );

  return (
    <section className="bg-mid w-80 h-full flex overflow-x-hidden overflow-y-auto shrink-0">
      <hr className="sm:px-2 md:px-6 border-none" />
      <section className="w-full flex flex-col gap-2 py-8">
        <div className="w-full">
          <h1 className={sidebar.title}>User Settings</h1>
          {item("MyAccount", "My Account")}
          {item("Profiles", "Profiles")}
          {item("Blocked", "Blocked")}
          <hr className={sidebar.divider} />
        </div>
        <div className="w-full">
          <h1 className={sidebar.title}>Billing Settings</h1>
          {soon("Remix")}
          {soon("Subscriptions")}
          {soon("Billing")}
          <hr className={sidebar.divider} />
        </div>
        <div className="w-full">
          <h1 className={sidebar.title}>App Settings</h1>
          {soon("Appearance")}
          {soon("Voice & Video")}
          {soon("Text & Images")}
          {soon("Notifications")}
          <hr className={sidebar.divider} />
          <h2
            className={sidebar.item + " flex items-center justify-between"}
            onClick={onLogout}
          >
            Logout <span className="text-gray-400">{LogOut}</span>
          </h2>
          <hr className={sidebar.divider} />
        </div>
      </section>
    </section>
  );
};
