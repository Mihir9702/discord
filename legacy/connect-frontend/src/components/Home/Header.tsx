import React from "react";
import { MessageSquare, Inbox, HelpCircle, User } from "../Icons";
import { DispatchString } from "../../types/dispatch";
import { MessageResolver } from "../../../../server/src/resolvers/message";

interface Props {
  state: string;
  setState: DispatchString;
}

export default ({ state, setState }: Props) => {
  const css = {
    // prettier-ignore
    header: "w-full flex flex-auto justify-between items-center min-h-[48px] py-[8px] font-lg text-gray-200 ",
    section: "flex items-center justify-between font-gg font-normal",
    button: "text-lg hover:text-gray-200 hover:bg-highlight rounded px-2 ",
  };

  const divider = <hr className="h-6 w-[1px] rounded border-dash" />;

  const select = "bg-highlight text-gray-200";
  const online = state === "online" ? select : "";
  const all = state === "all" ? select : "";
  const pending = state === "pending" ? select : "";
  const blocked = state === "blocked" ? select : "";

  return (
    <header className={css.header}>
      <section className={css.section + " w-full px-3"}>
        <div className="flex items-center justify-start">
          <div className="flex mx-6 gap-4">
            <h1 className="flex items-center space-x-2">
              <span>{User}</span>
              <span>Friends</span>
            </h1>
            {divider}
          </div>
          <div className="flex gap-3 text-gray-400">
            <button
              className={css.button + online}
              onClick={() => setState("online")}
            >
              Online
            </button>
            <button
              className={css.button + all}
              onClick={() => setState("all")}
            >
              All
            </button>
            <button
              className={css.button + pending}
              onClick={() => setState("pending")}
            >
              Pending
            </button>
            <button
              className={css.button + blocked}
              onClick={() => setState("blocked")}
            >
              Blocked
            </button>
            <button
              className={`
            text-lg px-2
            rounded-md whitespace-nowrap
            ${state === "add" ? "bg-transparent" : "bg-[#248046]"}
            ${state === "add" ? "text-[#43b581]" : "text-gray-50"}
            `}
              onClick={() => setState("add")}
            >
              Add Friend
            </button>
          </div>
        </div>
        <button className={css.button + "min-w-[24px]"}>{MessageSquare}</button>
      </section>

      <section className={css.section + "px-3"}>
        {divider}
        <button className={css.button}>{Inbox}</button>
        <button className={css.button}>{HelpCircle}</button>
      </section>
    </header>
  );
};
