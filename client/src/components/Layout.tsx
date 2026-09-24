import React from "react";
import PtChats from "./Mid/PtChats";
import UserMidOptions from "./Mid/UserMidOptions";
import ServerNavigation from "./ServerNavigation";
import UserDisplay from "./UserDisplay";
import Search from "./Search";
import ServerChannels from "./Mid/ServerChannels";
import Home from "./Home";
import Chat from "./Chat";
import Members from "./Members";

interface LayoutProps {
  home?: boolean;
  server?: boolean;
}

export default (props: LayoutProps) => {
  const { home, server } = props;
  const [status, setStatus] = React.useState(false);
  const [smChat, isSMChat] = React.useState(false);

  return (
    <main className="flex justify-start w-full h-screen overflow-hidden">
      <ServerNavigation />

      <section className="mid-col">
        {server ? (
          <ServerChannels />
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <Search />
            <UserMidOptions />
            <PtChats />
          </div>
        )}
        <UserDisplay status={status} setStatus={setStatus} />
      </section>

      {home ? (
        <Home />
      ) : (
        <div
          className={`flex-1 min-w-0 h-screen ${
            smChat ? "border-r border-dash" : ""
          }`}
        >
          <Chat size={smChat} setSize={isSMChat} />
        </div>
      )}

      {!home && smChat && <Members />}
    </main>
  );
};
