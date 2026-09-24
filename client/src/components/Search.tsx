import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  PartyChatsDocument,
  PartyChatsQuery,
  UserServersDocument,
  UserServersQuery,
} from "src/graphql";
import { useMe } from "src/utils/useMe";
import UserIcon from "./UserIcon";
import ServerIcon from "./ServerIcon";

type Result = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  kind: string;
};

// quick switcher - searches your dms (friends) and servers, top 5 results
export default () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const { me } = useMe();
  const { data: dms } = useQuery<PartyChatsQuery>(PartyChatsDocument);
  const { data: servers } = useQuery<UserServersQuery>(UserServersDocument);

  const query = value.trim().toLowerCase();

  const all: Result[] = [
    ...(dms?.partyChats || []).flatMap((chat) => {
      const friend = chat.users?.find((u) => u.id !== me?.id);
      if (!friend) return [];
      return [
        {
          key: chat.channelId,
          label: `${friend.nameId}#${friend.userId}`,
          href: `/@me/${chat.channelId}`,
          icon: <UserIcon iconId={friend.iconId} name={friend.nameId} />,
          kind: "Direct Message",
        },
      ];
    }),
    ...(servers?.userServers || []).flatMap((s) => {
      const channel = s.channels?.[0];
      if (!channel) return [];
      return [
        {
          key: String(s.serverId),
          label: s.name,
          href: `/@me/${s.serverId}/${channel.channelId}`,
          icon: (
            <div className="scale-[0.66] -m-2">
              <ServerIcon name={s.name} icon={s.icon} />
            </div>
          ),
          kind: "Server",
        },
      ];
    }),
  ];

  const results = query
    ? all.filter((r) => r.label.toLowerCase().includes(query)).slice(0, 5)
    : [];

  function go(result?: Result) {
    if (!result) return;
    setValue("");
    setOpen(false);
    router.push(result.href);
  }

  return (
    <sub className="relative p-2 shadow shadow-darkish">
      <input
        className="w-full h-full p-1 px-2 rounded placeholder:text-md placeholder:font-light placeholder:font-sans placeholder:text-left text-[#dbdee1] bg-[#1e1f22] focus:outline-0"
        type="text"
        placeholder="Find or start a conversation"
        value={value}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => {
          setValue(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            go(results[active]);
          } else if (e.key === "Escape") {
            setValue("");
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {open && query && (
        <ul className="absolute left-2 right-2 top-full mt-1 z-30 bg-[#111214] rounded-md p-1 shadow-lg shadow-darkish font-normal text-sm">
          {results.length === 0 && (
            <li className="p-2 text-gray-400">No results</li>
          )}
          {results.map((r, i) => (
            <li
              key={r.key}
              onMouseDown={() => go(r)}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center gap-2 p-1.5 rounded cursor-pointer ${
                i === active ? "bg-highlight text-white" : "text-gray-300"
              }`}
            >
              {r.icon}
              <span className="truncate flex-1">{r.label}</span>
              <span className="text-xs text-gray-500">{r.kind}</span>
            </li>
          ))}
        </ul>
      )}
    </sub>
  );
};
