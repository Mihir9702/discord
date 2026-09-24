import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  CreateServerDocument,
  CreateServerMutation,
  InviteDocument,
  InviteQuery,
  JoinMutation,
  JoinDocument,
} from "src/graphql";
import { ChevronRight } from "../Icons";
import { useMe } from "src/utils/useMe";

export type Display = "menu" | "create" | "join";

const templates = ["Gaming", "School Club", "Study Group"];

const origin = typeof window === "undefined" ? "" : window.location.origin;

export default ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const client = useApolloClient();
  const { me } = useMe();
  const [display, setDisplay] = React.useState<Display>("menu");
  const [serverName, setServerName] = React.useState<string>("");
  const [joinLink, setJoinLink] = React.useState<string>("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const setMenu = () => {
    setError("");
    setDisplay("menu");
  };

  // new servers show up in the server list + roles right away
  const refetchQueries = ["UserServers", "User"];

  const [create] = useMutation<CreateServerMutation>(CreateServerDocument, {
    refetchQueries,
    awaitRefetchQueries: true,
  });
  const [join] = useMutation<JoinMutation>(JoinDocument, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  function template(name: string) {
    setServerName(`${me?.nameId}'s ${name.toLowerCase()}`);
    setDisplay("create");
  }

  async function Create(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!serverName.trim() || busy) return;

    setBusy(true);
    setError("");
    try {
      const { data } = await create({ variables: { name: serverName } });
      const s = data!.createServer;
      onClose();
      router.push(`/@me/${s.serverId}/${s.channels?.[0]?.channelId}`);
    } catch (ex: any) {
      setError(ex.message);
      setBusy(false);
    }
  }

  async function Join(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!joinLink.trim() || busy) return;

    setBusy(true);
    setError("");
    try {
      await join({ variables: { link: joinLink } });
      const { data } = await client.query<InviteQuery>({
        query: InviteDocument,
        variables: { link: joinLink },
        fetchPolicy: "network-only",
      });
      onClose();
      if (data.invite) {
        router.push(`/@me/${data.invite.serverId}/${data.invite.channelId}`);
      }
    } catch (ex: any) {
      setError(ex.message);
      setBusy(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-max w-max">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded bg-white opacity-100 text-2xl flex flex-col items-center justify-center"
      >
        {display === "menu" && (
          <div>
            <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
              <div className="mb-2">
                <h1 className="my-1 text-darkish font-extrabold text-2xl text-center">
                  Create a server
                </h1>
                <p className="max-w-md text-lg text-center text-gray-400 font-extralight">
                  Your server is where you and your friends hang out. Make yours
                  and start talking.
                </p>
                <section className="flex flex-col mt-4 w-full">
                  <button
                    onClick={() => setDisplay("create")}
                    className={`
                      border border-gray-200 hover:bg-gray-100
                      transition-all w-full p-4 rounded-lg
                      flex items-center justify-between
                    `}
                  >
                    <h1 className="text-lg text-darkish text-left mx-4">
                      Create My Own
                    </h1>
                    <p>{ChevronRight}</p>
                  </button>

                  <h1 className="uppercase font-extrabold text-xs text-gray-600 mt-6 mb-3">
                    start from a template
                  </h1>

                  <div className="flex flex-col gap-2">
                    {templates.map((name) => (
                      <button
                        key={name}
                        onClick={() => template(name)}
                        className={`
                      border border-gray-200 hover:bg-gray-100
                      transition-all w-full p-4 rounded-lg
                      flex items-center justify-between
                    `}
                      >
                        <h1 className="text-lg text-darkish text-left mx-4">
                          {name}
                        </h1>
                        <p>{ChevronRight}</p>
                      </button>
                    ))}
                  </div>

                  <h1 className="text-2xl text-darkish font-normal text-center mt-6 mb-3">
                    Have an invite already?
                  </h1>
                  <button
                    onClick={() => setDisplay("join")}
                    className={`
                    w-full p-2 py-2.5
                    rounded text-sm transition-all
                    bg-[#6d6f78] hover:bg-[#474950]
                    text-gray-200
                    `}
                  >
                    Join a Server
                  </button>
                </section>
              </div>
            </motion.div>
          </div>
        )}
        {display === "create" && (
          <div>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1 className="my-1 text-darkish font-extrabold text-2xl">
                Customize your server
              </h1>
              <p className="max-w-md text-lg text-center text-gray-400 font-extralight">
                Give your new server a personality with a name and an icon. You
                can always change it later.
              </p>
              <div className="mt-4 flex justify-center items-center">
                <div className="p-8 rounded-full bg-gray-600"></div>
              </div>
              <label className="text-xs w-full">
                Server Name
                <input
                  className={`
                  bg-[rgb(226,229,232)] text-[#57595f] placeholder:text-[#57595f]
                  focus:outline-0 text-md font-light rounded p-2 py-3 w-full
                  `}
                  type="text"
                  value={serverName}
                  onChange={({ target }) => setServerName(target.value)}
                  placeholder={`${me?.nameId}'s server`}
                  autoFocus
                  onKeyUp={(event) => {
                    if (event.key === "Enter" && serverName) {
                      Create(event);
                    }
                  }}
                />
              </label>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <div className="text-sm flex w-full items-center justify-between my-4">
                <button onClick={() => setMenu()}>Back</button>
                <button
                  disabled={!serverName.trim() || busy}
                  onClick={(e) => Create(e)}
                  className={`p-2 px-6 
                  rounded text-gray-100
                  transition-all font-light
                  ${!serverName && "cursor-not-allowed"}
                  ${!serverName && "bg-[#a5abf3]"}
                  ${serverName && "bg-[#5864f2]"}
                  ${serverName && "hover:bg-darkblue"}
                   `}
                >
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {display === "join" && (
          <div>
            <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
              <div>
                <h1 className="text-2xl mt-2 text-center">Join a Server</h1>
                <p className="text-gray-400 text-sm mt-2">
                  Enter an invite below to join an existing server.
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label className="uppercase text-sm font-bold">
                  Invite Link <span className="text-red-500 mx-2">*</span>
                  <input
                    className={`
                  bg-[#e2e5e8] text-[#57595f] placeholder:text-[#57595f]
                  focus:outline-0 text-md font-light rounded p-2 py-3 w-full
                  `}
                    type="text"
                    placeholder={`${origin}/invite/hTKzmak`}
                    value={joinLink}
                    autoFocus
                    onChange={({ target }) => setJoinLink(target.value)}
                    onKeyUp={(event) => {
                      if (event.key === "Enter" && joinLink) {
                        Join(event);
                      }
                    }}
                  />
                </label>
                <div className="text-left">
                  <h1 className="uppercase text-xs font-semibold">
                    Invites should look like
                  </h1>

                  <p className="mt-2 text-xs font-normal">hTKzmak</p>
                  <p className="text-xs font-normal">{origin}/invite/hTKzmak</p>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="text-sm flex w-full items-center justify-between my-4">
                  <div className="flex gap-2">
                    <button onClick={() => setMenu()}>Back</button>
                  </div>
                  <button
                    disabled={!joinLink.trim() || busy}
                    onClick={(e) => Join(e)}
                    className={`
                    p-2 px-6
                    rounded text-gray-100
                    transition-all font-light
                    ${!joinLink && "cursor-not-allowed"}
                    ${!joinLink && "bg-[#a5abf3]"}
                    ${joinLink && "bg-[#5864f2]"}
                    ${joinLink && "hover:bg-darkblue"}
               `}
                  >
                    Join Server
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
