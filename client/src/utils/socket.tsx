import React, { useEffect } from "react";
import Router from "next/router";
import { ObservableQuery, useApolloClient } from "@apollo/client";
import { io } from "socket.io-client";
import { API_URL } from "src/client";
import { useMe } from "./useMe";

type Match = (query: ObservableQuery) => boolean;

// live updates: the api tells us what changed, we refetch the queries on screen
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();
  const { me } = useMe();
  const userId = me?.id;

  useEffect(() => {
    if (!userId) return;

    const socket = io(API_URL, { withCredentials: true });

    const refetch = (names: string[], match: Match = () => true) =>
      client
        .refetchQueries({
          include: "active",
          onQueryUpdated: (q) => names.includes(q.queryName || "") && match(q),
        })
        .catch(() => {});

    socket.on("message", ({ channelId }: { channelId: string }) =>
      refetch(["Messages"], (q) => q.variables?.channelId === channelId)
    );

    socket.on("friends", () => refetch(["UserFriends", "PartyChats"]));

    socket.on("presence", () =>
      refetch([
        "UserFriends",
        "PartyChats",
        "CurrentChannel",
        "Messages",
        "Server",
      ])
    );

    socket.on("server", ({ serverId }: { serverId: number }) => {
      refetch(["UserServers", "CurrentChannel", "Invite"]);
      refetch(["Server"], (q) => q.variables?.serverId === serverId);
    });

    socket.on("server:removed", ({ serverId }: { serverId: number }) => {
      refetch(["UserServers", "User", "Invite"]);
      if (Router.query.channel && Router.query.id === String(serverId)) {
        Router.push("/@me");
      }
    });

    socket.on("account", () => refetch(["User", "UserFriends"]));

    // catch up on anything we missed while disconnected
    socket.io.on("reconnect", () =>
      client.refetchQueries({ include: "active" }).catch(() => {})
    );

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return <>{children}</>;
}
