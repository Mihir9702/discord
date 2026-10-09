import React from "react";
import { useRouter } from "next/router";
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

export default function Layout({ home, server }: LayoutProps) {
  const router = useRouter();
  const [status, setStatus] = React.useState(false);
  const [smChat, isSMChat] = React.useState(false);
  const [mobileSidebar, setMobileSidebar] = React.useState(false);

  // Close the mobile channel picker after navigation and on Escape.
  React.useEffect(() => {
    setMobileSidebar(false);
  }, [router.asPath]);
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSidebar(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="flex justify-start w-full h-screen overflow-hidden">
      <ServerNavigation />

      <section
        id="mobile-conversations"
        className={`mid-col ${mobileSidebar ? "mobile-expanded" : "mobile-collapsed"}`}
      >
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

      {mobileSidebar && (
        <button
          type="button"
          aria-label="Close conversations menu"
          onClick={() => setMobileSidebar(false)}
          className="md:hidden fixed inset-0 bg-black/30 z-20"
        />
      )}

      {!home && (
        <button
          type="button"
          aria-controls="mobile-conversations"
          aria-expanded={mobileSidebar}
          onClick={() => setMobileSidebar((opened) => !opened)}
          className="md:hidden fixed bottom-4 left-2 z-40 w-14 rounded-md bg-mid px-1 py-2 text-[11px] font-semibold text-gray-100 border border-dash shadow-lg"
        >
          {mobileSidebar ? "Close" : server ? "Channels" : "Chats"}
        </button>
      )}

      {home ? (
        <Home />
      ) : (
        <div className={`flex-1 min-w-0 h-screen ${smChat ? "border-r border-dash" : ""}`}>
          <Chat size={smChat} setSize={isSMChat} />
        </div>
      )}

      {!home && smChat && (
        <div className="fixed inset-y-0 right-0 z-30 shadow-xl lg:relative lg:z-auto lg:shadow-none">
          <Members />
        </div>
      )}
    </main>
  );
}
