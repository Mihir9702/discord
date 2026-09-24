import React from "react";
import { MessagesQuery } from "src/graphql";
import Tooltip from "../Tooltip";
import UserIcon from "../UserIcon";
import { User as UserSvg } from "../Icons";
import { DispatchBool } from "src/types/dispatch";

interface HeaderProps {
  id: NonNullable<MessagesQuery["messages"]["friend"]>;
  size: boolean;
  setSize: DispatchBool;
}

// dm header: who you're talking to
export default ({ id, size, setSize }: HeaderProps) => {
  const { status, nameId, iconId, userId } = id;

  return (
    <section className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center p-[6.5px] mx-3">
        <UserIcon iconId={iconId} status={status} name={nameId} />
        <Tooltip content={`${nameId}#${userId}`}>
          <p className="text-md font-semibold text-gray-200">{nameId}</p>
        </Tooltip>
      </div>

      <Tooltip content={size ? "Hide User Profile" : "Show User Profile"}>
        <button
          aria-label="User Profile"
          className={`mx-4 hover:text-gray-200 hover:transition-all ${
            size ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setSize(!size)}
        >
          {UserSvg}
        </button>
      </Tooltip>
    </section>
  );
};
