import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { UserServersDocument, UserServersQuery } from "src/graphql";
import { Channel, Server } from "src/types/query";
import Loader from "../Loader";
import Image from "next/image";

export default () => {
  const { data, loading } = useQuery<UserServersQuery>(UserServersDocument);
  const servers = data?.userServers;

  function intro(arr: Channel[]) {
    return arr.filter((c: Channel) => c.name === "intro")[0].channelId;
  }

  if (loading) return <Loader />;
  else if (!servers) return <ul></ul>;

  return (
    <ul className="flex flex-col items-center gap-2 my-2">
      {servers.map((s: Server) => {
        const channelId = intro(s.channels);
        return (
          <Link key={s.serverId} href={`/@me/${s.serverId}/${channelId}`}>
            {s.icon && <Image src={s.icon} alt={s.name} />}
            <p className="server-icon flex justify-center items-center">
              <span children={s.name[0]} />
            </p>
          </Link>
        );
      })}
    </ul>
  );
};
