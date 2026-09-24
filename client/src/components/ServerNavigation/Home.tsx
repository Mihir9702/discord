import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tooltip from "../Tooltip";

export default () => {
  // friends + dms are everything under /@me that isn't a server
  const active = !useRouter().query.channel;

  return (
    <div className="relative w-full flex justify-center group">
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r bg-white transition-all ${
          active ? "h-10" : "h-0 group-hover:h-5"
        }`}
      />
      <Tooltip content="Direct Messages" position="right">
        <Link href={`/@me`}>
          <div className="server-icon bg-discord" />
        </Link>
      </Tooltip>
    </div>
  );
};
