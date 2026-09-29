import React from "react";
import PtChats from "./Mid/PtChats";
import UserMidOptions from "./Mid/UserMidOptions";
import ServerNavigation from "./ServerNavigation";
import UserDisplay from "./UserDisplay";
import Search from "./Search";
import ServerChannels from "./Mid/ServerChannels";
import Home from "./Home";
import Chat from "./Chat";
import { useQuery } from "@apollo/client";
import {
  UserQuery,
  UserDocument,
  CurrentChannelQuery,
  CurrentChannelDocument,
} from "src/graphql";
import { useRouter } from "next/router";

interface LayoutProps {
  home?: boolean;
  server?: boolean;
}

export default (props: LayoutProps) => {
  const { home, server } = props;
  const [fetchChats, setFetchChats] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [smChat, isSMChat] = React.useState(false);

  const { data, refetch } = useQuery<UserQuery>(UserDocument);

  // channel id
  let channelId;
  const router = useRouter().query as { channel: string; id: string };
  if (router.channel) {
    channelId = router.channel;
  } else {
    channelId = router.id;
  }

  const { data: currCh } = useQuery<CurrentChannelQuery>(
    CurrentChannelDocument,
    {
      variables: { channelId },
    }
  );
  const id = data?.user;
  const users = currCh?.currentChannel?.users;
  const online = users?.filter((user) => user.status === "online");
  const offline = users?.filter((user) => user.status === "offline");

  return (
    <main className="flex justify-start w-full min-h-screen overflow-hidden">
      <ServerNavigation />

      <section className="mid-col">
        {server ? (
          <ServerChannels
            status={status}
            setStatus={setStatus}
            refetch={refetch}
          />
        ) : (
          <div className="flex flex-col">
            <Search />
            <UserMidOptions />
            <PtChats
              status={status}
              setStatus={setStatus}
              refetch={refetch}
              fetch={fetchChats}
              fetchChats={setFetchChats}
            />
          </div>
        )}
        <UserDisplay id={id} status={status} setStatus={setStatus} />
      </section>

      {home ? (
        <Home fetchChats={setFetchChats} />
      ) : (
        <div
          className={`
          ${smChat && "w-4/6 h-screen relative"}
          ${smChat && "border-r border-dash"}
          ${!smChat && "w-full h-screen"}
      `}
        >
          <Chat size={smChat} setSize={isSMChat} />
        </div>
      )}

      {smChat && (
        <section className="w-1/6 h-screen bg-[#303338] text-gray-300 font-light">
          {/* members in server */}

          <div className="h-full m-2">
            <h1 className="my-1">Online - {online ? online.length : 0}</h1>
            {online &&
              online.map((u) => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h1>{u.nameId}</h1>
                    </div>
                  </div>
                );
              })}

            <h1 className="my-1">Offline - {offline ? offline.length : 0}</h1>
            {offline &&
              offline.map((u) => {
                return (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h1>{u.nameId}</h1>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
};
