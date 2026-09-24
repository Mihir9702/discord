import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UserServersDocument, UserServersQuery } from "src/graphql";
import ServerIcon from "../ServerIcon";
import Tooltip from "../Tooltip";

export default () => {
  const router = useRouter();
  const { data } = useQuery<UserServersQuery>(UserServersDocument);
  const servers = data?.userServers || [];

  // the server being viewed (/@me/[serverId]/[channelId])
  const active = router.query.channel ? Number(router.query.id) : null;

  return (
    <ul className="flex flex-col items-center gap-2 my-2 w-full">
      {servers.map((s) => {
        const channelId = s.channels?.[0]?.channelId;
        const selected = active === s.serverId;
        return (
          <li
            key={s.serverId}
            className="relative w-full flex justify-center group"
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r bg-white transition-all ${
                selected ? "h-10" : "h-0 group-hover:h-5"
              }`}
            />
            <Tooltip content={s.name} position="right">
              <Link href={`/@me/${s.serverId}/${channelId}`}>
                <ServerIcon
                  name={s.name}
                  icon={s.icon}
                  size="nav"
                  active={selected}
                />
              </Link>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};
