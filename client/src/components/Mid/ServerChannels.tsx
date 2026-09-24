import React, { useEffect } from "react";
import Link from "next/link";
import Modal from "../Modal";
import ServerMenu from "./ServerMenu";
import ServerMenuOpt, { CreateChannel } from "./ServerMenuOpt";
import { ServerDocument, ServerQuery } from "src/graphql";
import { useQuery } from "@apollo/client";
import { ChevronDown, Cross, Hash, Plus } from "../Icons";
import { useRouter } from "next/router";
import { ServerContext } from "src/utils/context";
import { useRole } from "src/utils/useMe";
import { RegularSkeleton } from "../Skeleton";
import Tooltip from "../Tooltip";

// channel list for the server in the url (/@me/[serverId]/[channelId])
export default () => {
  const router = useRouter();
  const serverId = Number(router.query.id);
  const channelId = router.query.channel as string;

  const [modal, setModal] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuOpt, setMenuOpt] = React.useState("");
  const [menuOpts, setMenuOpts] = React.useState(false);

  const { data, loading, error } = useQuery<ServerQuery>(ServerDocument, {
    variables: { serverId },
    skip: !serverId,
  });
  const { manage, owner } = useRole(serverId);

  const s = data?.server;
  const cs = s?.channels || [];

  // left / kicked / deleted server -> home
  useEffect(() => {
    if (error || (!loading && data && !s)) router.replace("/@me");
  }, [error, loading, data, s]);

  // deleted channel -> first channel
  useEffect(() => {
    if (s && cs.length && !cs.some((c) => c.channelId === channelId)) {
      router.replace(`/@me/${s.serverId}/${cs[0].channelId}`);
    }
  }, [s, channelId]);

  if (loading && !data) return <RegularSkeleton />;
  if (!s) return null;

  function open(opt: string) {
    setMenuOpt(opt);
    setMenuOpts(true);
  }

  return (
    <ServerContext.Provider value={{ s, channelId, manage, owner }}>
      <main className="flex flex-col flex-1 min-h-0">
        <section className="text-gray-100 text-center h-full max-h-[48px] shadow shadow-darkish flex flex-col gap-3 shrink-0">
          <h1
            onClick={() => setMenu(!menu)}
            className={`
          relative flex items-center justify-center
          hover:bg-highlight hover:cursor-pointer transition-all
          min-h-[48px] overflow-hidden px-8
          text-lg font-semibold font-sans text-ellipsis text-center`}
          >
            <span className="pointer-events-none select-none truncate">
              {s.name}
            </span>
            <span className="absolute right-2">
              {menu ? Cross : ChevronDown}
            </span>
          </h1>
        </section>

        {menu && (
          <Modal handleClose={() => setMenu(!menu)}>
            <div className="fixed left-[4.5rem] top-0">
              <ServerMenu
                manage={manage}
                owner={owner}
                setMenu={setMenu}
                open={open}
              />
            </div>
          </Modal>
        )}

        {menuOpts && (
          <ServerMenuOpt menuOpt={menuOpt} onClose={() => setMenuOpts(false)} />
        )}

        <section className="my-4 mx-2 flex-1 min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between mx-1">
            <h1 className="text-gray-400 text-xs font-semibold uppercase">
              Text Channels — {cs.length}
            </h1>

            {manage && (
              <Tooltip content="Create Channel">
                <button
                  aria-label="Create Channel"
                  onClick={() => setModal(!modal)}
                  className="text-gray-400 hover:text-gray-100 scale-[0.75] cursor-pointer"
                >
                  {Plus}
                </button>
              </Tooltip>
            )}
          </div>

          {modal && <CreateChannel onClose={() => setModal(false)} />}

          <section className="mt-2 flex flex-col gap-0.5">
            {cs.map((ch) => (
              <Link
                key={ch.channelId}
                href={`/@me/${s.serverId}/${ch.channelId}`}
                className={`p-1.5 px-2 rounded flex items-center gap-1.5 font-normal hover:bg-highlight hover:text-gray-200 ${
                  ch.channelId === channelId
                    ? "bg-highlight text-white"
                    : "text-gray-400"
                }`}
              >
                <span className="text-gray-400 scale-90">{Hash}</span>
                <span className="truncate">{ch.name}</span>
              </Link>
            ))}
          </section>
        </section>
      </main>
    </ServerContext.Provider>
  );
};
