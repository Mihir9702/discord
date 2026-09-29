import React from "react";
import { RegularSkeleton } from "../Skeleton";
import Link from "next/link";
import { User, Channel } from "src/types/query";
import { useQuery } from "@apollo/client";
import { PartyChatsQuery, PartyChatsDocument } from "src/graphql";
import { statusColor } from "src/utils/statusColor";
import { reverseElements } from "src/utils/reverseElements";
import { DispatchBool } from "src/types/dispatch";
import { useRouter } from "next/router";
import Status from "../Status";

export default ({
  status,
  setStatus,
  refetch: refetchStatus,
  fetch,
  fetchChats,
}: {
  status: boolean;
  setStatus: DispatchBool;
  refetch: () => void;
  fetch: boolean;
  fetchChats: DispatchBool;
}) => {
  const channelId = useRouter().query.id;
  const { data, loading, refetch } =
    useQuery<PartyChatsQuery>(PartyChatsDocument);
  const ptChats = data?.partyChats;

  const name = localStorage.getItem("id");

  if (fetch) {
    refetch();
    fetchChats(false);
  }

  if (loading) return <RegularSkeleton />;

  return (
    <main className="overflow-auto">
      {reverseElements(ptChats!).map((chat: Channel) => {
        const ptChat = chat?.users?.filter(
          (user: User) => user.nameId !== name
        )[0];
        const status = ptChat?.status;
        const statusColorCss = statusColor(status);
        const ifs =
          status &&
          statusColorCss +
            " rounded-full absolute w-2.5 h-2.5 bottom-0 right-0.5";
        return (
          <Link
            key={chat?.channelId}
            href={`/@me/${chat?.channelId}`}
            className={`
              status-button
              ${channelId === chat?.channelId && "bg-highlight"}
            `}
          >
            <div className="relative inline-block">
              <div
                className={`w-8 h-8 rounded-full`}
                style={{ backgroundColor: ptChat.iconId }}
              />
              <span className={ifs} />
            </div>
            <p className="text-lg font-light">{ptChat?.nameId}</p>
          </Link>
        );
      })}

      {status && <Status setStatus={setStatus} refetch={refetchStatus} />}
    </main>
  );
};
