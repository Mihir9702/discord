import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { PartyChatsQuery, PartyChatsDocument } from "src/graphql";
import { RegularSkeleton } from "../Skeleton";
import UserIcon from "../UserIcon";
import { useMe } from "src/utils/useMe";

// direct message list
export default () => {
  const channelId = useRouter().query.id;
  const { me } = useMe();
  const { data, loading } = useQuery<PartyChatsQuery>(PartyChatsDocument);

  if (loading && !data) return <RegularSkeleton />;

  const chats = (data?.partyChats || [])
    .map((chat) => ({
      chat,
      friend: chat.users?.find((user) => user.id !== me?.id),
    }))
    .filter(({ friend }) => !!friend)
    .reverse();

  return (
    <main className="overflow-y-auto flex-1 min-h-0 px-2 flex flex-col gap-0.5">
      {chats.map(({ chat, friend }) => (
        <Link
          key={chat.channelId}
          href={`/@me/${chat.channelId}`}
          className={`
              status-button text-gray-400 hover:text-gray-200
              ${channelId === chat.channelId ? "bg-highlight text-white" : ""}
            `}
        >
          <UserIcon
            iconId={friend!.iconId}
            status={friend!.status}
            name={friend!.nameId}
          />
          <p className="text-lg font-light truncate">{friend!.nameId}</p>
        </Link>
      ))}
    </main>
  );
};
