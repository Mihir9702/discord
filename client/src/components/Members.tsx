import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CurrentChannelDocument, CurrentChannelQuery } from "src/graphql";
import UserIcon from "./UserIcon";

type Member = NonNullable<
  CurrentChannelQuery["currentChannel"]["users"]
>[number];

// people in the current server channel / dm
export default () => {
  const router = useRouter();
  const channelId = (router.query.channel || router.query.id) as string;

  const { data } = useQuery<CurrentChannelQuery>(CurrentChannelDocument, {
    variables: { channelId },
    skip: !channelId,
  });

  const users = [...(data?.currentChannel?.users || [])].sort((a, b) =>
    a.nameId.localeCompare(b.nameId)
  );
  const online = users.filter((user) => user.status !== "offline");
  const offline = users.filter((user) => user.status === "offline");

  const group = (title: string, list: Member[], dim = false) => (
    <div className="mb-4">
      <h1 className="my-1 mx-2 text-xs uppercase font-semibold text-gray-400">
        {title} — {list.length}
      </h1>
      {list.map((u) => (
        <div
          key={u.id}
          title={`${u.nameId}#${u.userId}`}
          className={`flex items-center gap-3 p-1.5 mx-1 rounded hover:bg-highlight ${
            dim ? "opacity-40" : ""
          }`}
        >
          <UserIcon iconId={u.iconId} status={u.status} name={u.nameId} />
          <p className="truncate text-gray-300">{u.nameId}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-60 shrink-0 h-screen bg-mid text-gray-300 font-light overflow-y-auto py-4 px-2">
      {group("Online", online)}
      {group("Offline", offline, true)}
    </section>
  );
};
