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
    item: "cursor-pointer hover:bg-highlight w-auto md:w-full text-start p-3 md:p-4 py-2 rounded text-gray-200",
    soon: "w-full text-start p-4 py-2 rounded text-gray-200 opacity-40 cursor-not-allowed",
    divider: "border-1 border-dash mx-4 my-1",
  };

  const item = (key: Option, label: string) => (
    <button type="button"
      className={`${sidebar.item} ${
        option === key ? "bg-highlight text-white" : ""
      }`}
      aria-current={option === key ? "page" : undefined}
      style={{ whiteSpace: "nowrap" }}
      onClick={() => setOption(key)}
    >
      {label}
    </button>
  );

  const soon = (label: string) => (
    <h2 className={sidebar.soon} title="Coming soon">
      {label}
    </h2>
  );

  return (
    <section className="bg-mid w-full md:w-64 lg:w-80 h-auto md:h-full flex overflow-x-auto md:overflow-x-hidden overflow-y-auto shrink-0">
      <hr className="sm:px-2 md:px-6 border-none" />
      <section className="w-full flex flex-col gap-2 py-3 md:py-8">
        <div className="w-full">
          <h1 className={sidebar.title + " hidden md:block"}>User Settings</h1>
          <div className="flex items-center gap-1 md:block px-2 md:px-0 pr-12 md:pr-0">
            {item("MyAccount", "My Account")}
            {item("Profiles", "Profiles")}
            {item("Blocked", "Blocked")}
          </div>
          <button type="button" className="md:hidden mx-4 mt-1 self-start text-xs text-gray-300 hover:text-white" onClick={onLogout}>Log out</button>
          <hr className={sidebar.divider} />
        </div>
        <div className="hidden md:block w-full">
          <h1 className={sidebar.title}>Billing Settings</h1>
          {soon("Remix")}
          {soon("Subscriptions")}
          {soon("Billing")}
          <hr className={sidebar.divider} />
        </div>
        <div className="hidden md:block w-full">
          <h1 className={sidebar.title}>App Settings</h1>
          {soon("Appearance")}
          {soon("Voice & Video")}
          {soon("Text & Images")}
          {soon("Notifications")}
          <hr className={sidebar.divider} />
          <button type="button"
            className={sidebar.item + " flex items-center justify-between"}
            onClick={onLogout}
          >
            Logout <span className="text-gray-400">{LogOut}</span>
          </button>
          <hr className={sidebar.divider} />
        </div>
      </section>
    </section>
  );
};
