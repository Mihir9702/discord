import React from "react";
import { DispatchString } from "src/types/dispatch";

interface Options {
  option: string;
  setOption: DispatchString;
}

export default ({ option, setOption }: Options) => {
  const sidebar = {
    title: "text-xs font-semibold uppercase mx-4 mb-1 text-gray-400",
    item: "cursor-pointer hover:bg-highlight w-full text-start p-4 py-2 rounded text-gray-200",
    divider: "border-1 border-dash mx-4 my-1",
  };

  return (
    <section className="bg-mid w-80 h-full flex overflow-x-hidden">
      <hr className="sm:px-2 md:px-6 border-none" />
      <section className="w-full flex flex-col gap-2">
        <div className="w-full">
          <h1 className={sidebar.title + " mt-8"}>User Settings</h1>
          <h2 className={sidebar.item} onClick={() => setOption("MyAccount")}>
            My Account
          </h2>
          <h2 className={sidebar.item} onClick={() => setOption("Profiles")}>
            Profiles
          </h2>
          <h2 className={sidebar.item} onClick={() => setOption("Blocked")}>
            Blocked
          </h2>
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
  );
};
