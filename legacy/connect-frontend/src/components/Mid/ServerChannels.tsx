import React from "react";
import Link from "next/link";
import Modal from "../Modal";
import Loader from "../Loader";
import ServerMenu from "./ServerMenu";
import ServerMenuOpt, { CreateChannel } from "./ServerMenuOpt";
import {
  ServerDocument,
  ServerQuery,
  UserFriendsQuery,
  UserFriendsDocument,
} from "src/graphql";
import { useQuery } from "@apollo/client";
import { ChevronDown, Cross, Plus } from "../Icons";
import { useRouter } from "next/router";
import { ServerContext } from "src/utils/context";
import { Channel } from "src/types/query";
import Status from "../Status";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  status: boolean;
  setStatus: DispatchBool;
  refetch: () => void;
}

// find u.role from u.roles[] where role.serverId === serverId
export default ({ status, setStatus, refetch: refetchStatus }: Props) => {
  const id = useRouter().query.id as string;
  const [fetch, isFetch] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuOpt, setMenuOpt] = React.useState("");
  const [menuOpts, setMenuOpts] = React.useState(false);

  const { data, loading, refetch } = useQuery<ServerQuery>(ServerDocument, {
    variables: { serverId: Number(id) },
  });
  const { data: ufData } = useQuery<UserFriendsQuery>(UserFriendsDocument);

  const uf = ufData?.userFriends;
  const d = data?.server;
  const s = d && d;
  const cs = s && s.channels;
  const currCC = s?.channels?.find(
    (c) => c.channelId === useRouter().query.channel
  );

  if (fetch) {
    refetch();
    isFetch(false);
  }

  if (loading) return <Loader />;
  return (
    <main>
      <section className="text-gray-100 text-center h-full max-h-[48px] shadow shadow-darkish flex flex-col gap-3">
        <h1
          onClick={() => setMenu(!menu)} // todo - server settings
          className={`
          relative flex items-center justify-center
          hover:bg-highlight hover:cursor-pointer transition-all
          min-h-[48px] overflow-hidden
          text-lg font-semibold font-sans text-ellipsis text-center`}
        >
          <span className="pointer-events-none select-none">{s?.name}</span>
          <span className="absolute right-2">{menu ? Cross : ChevronDown}</span>
        </h1>
      </section>

      {menu && (
        <Modal handleClose={() => setMenu(!menu)}>
          <div className="fixed left-[4.5rem] top-0">
            <ServerMenu
              menuOpts={menuOpts}
              setMenu={setMenu}
              setMenuOpt={setMenuOpt}
              setMenuOpts={setMenuOpts}
            />
          </div>
        </Modal>
      )}

      {menuOpts && (
        // @ts-ignore
        <ServerContext.Provider value={{ s, uf, currCC }}>
          <ServerMenuOpt
            menuOpt={menuOpt}
            onClose={() => setMenuOpts(!menuOpts)}
            refetch={isFetch}
          />
        </ServerContext.Provider>
      )}

      <section className="my-4 mx-2">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 text-xs font-semibold uppercase">
            Channels - {cs?.length}
          </h1>

          {modal && (
            <CreateChannel onClose={() => setModal(!modal)} refetch={isFetch} />
          )}

          <h5
            onClick={() => setModal(!modal)}
            className="text-gray-100 hover:text-gray-400 scale-[0.85] cursor-pointer"
          >
            {Plus}
          </h5>
        </div>

        <section className="my-8">
          {cs?.map((ch) => (
            // category
            <Link
              href={`/@me/${id}/${ch.channelId}`}
              className="text-gray-100 p-2 hover:bg-highlight rounded text-center flex flex-col"
            >
              {ch.name}
            </Link>
          ))}
        </section>
      </section>

      {status && <Status setStatus={setStatus} refetch={refetchStatus} />}
    </main>
  );
};
