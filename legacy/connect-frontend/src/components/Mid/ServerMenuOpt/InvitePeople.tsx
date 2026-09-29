import { useState, useContext } from "react";
import Modal from "src/components/Modal";
import { ServerMenuOptFC } from ".";
import { ServerContext } from "src/utils/context";
import { useMutation, useQuery } from "@apollo/client";
import {
  SendMessageDocument,
  SendMessageMutation,
  UserDocument,
  UserQuery,
} from "src/graphql";

export default ({ onClose }: ServerMenuOptFC) => {
  const [invSearch, setInvSearch] = useState("");

  const serverContext = useContext(ServerContext);

  const s = serverContext.s;
  const currCC = serverContext.currCC;
  const uf = serverContext.uf;
  const invites: string[] = [];

  const inviteMsg = ` Hey there! I'm inviting you to join ${s.name} on Connect.gg! \n \n Join here: https://connect.gg/${s.link} \n \n See you there! `;

  const { data } = useQuery<UserQuery>(UserDocument);
  const [msg] = useMutation<SendMessageMutation>(SendMessageDocument);

  const u = data?.user;
  return (
    <Modal handleClose={onClose} dark>
      <main className="flex flex-col items-start bg-background gap-2 p-2 w-[440px] h-[490px] text-gray-200 text-md font-light">
        <section className="flex flex-col items-start gap-2 my-2 w-full">
          <h1 className="text-lg">
            Invite friends to{" "}
            <strong className="font-semibold">{s.name}</strong>
          </h1>
          <h1 className="text-lg">
            # {` `}
            <strong className="font-semibold">{currCC.name}</strong>
          </h1>
          <input
            type="text"
            value={invSearch} // todo search func
            placeholder="Search for friends"
            onChange={({ target }) => {
              setInvSearch(target.value);
            }}
            className={
              "bg-[#1e1f22] text-gray-400 placeholder:text-md placeholder:font-light w-full p-1.5 focus:outline-none rounded"
            }
          />
        </section>
        <section className="flex flex-col overflow-auto items-start w-full h-full gap-2 max-h-[200px] border border-darkish">
          {uf.friends.map((f) => (
            <main className="flex items-center justify-between w-full">
              <section className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div className="relative inline-block">
                    <div
                      className={`w-8 h-8 rounded-full self-center`}
                      style={{ backgroundColor: f.iconId }}
                    />
                  </div>
                  <p className="text-lg font-sans">{f.nameId}</p>
                </div>
              </section>
              <button
                onClick={async () => {
                  await msg({
                    variables: {
                      // channelId: , // todo channel id with friend \ loop over friend chats to find channel id
                      msg: inviteMsg,
                    },
                  });

                  invites.push(f.nameId);
                  // disable this button:
                }}
                disabled={invites.includes(f.nameId)}
                className="px-2 py-1 text-lg rounded border border-online hover:bg-online transition-all"
              >
                Invite
              </button>
            </main>
          ))}
        </section>
        <section className="flex flex-col items-start w-full">
          <h1 className="uppercase text-xs">
            OR, send a server invite link to a friend
          </h1>
          <h1 className="w-full flex justify-between items-center bg-darkish rounded mx-1">
            <span>https://connect.gg/{s.link}</span>
            <button
              onClick={() => {}} // todo copy link to clipboard
              className="px-2 py-1 rounded bg-lightblue"
            >
              Copy
            </button>
          </h1>
        </section>
      </main>
    </Modal>
  );
};
