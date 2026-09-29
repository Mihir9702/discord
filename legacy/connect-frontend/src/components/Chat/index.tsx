import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  MessagesQuery,
  MessagesDocument,
  RemoveFriendMutation,
  RemoveFriendDocument,
  BlockMutation,
  BlockDocument,
} from "src/graphql";
import Loader from "../Loader";
import Input from "./Input";
import Header from "./Header";
import Messages from "./Messages";
import { User } from "../Icons";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  size: boolean;
  setSize: DispatchBool;
}

export default ({ size, setSize }: Props) => {
  const [fetch, isFetch] = useState(false);

  let channelId;
  const router = useRouter().query as { channel: string; id: string };
  if (router.channel) {
    channelId = router.channel;
  } else {
    channelId = router.id;
  }

  const { data, loading, refetch } = useQuery<MessagesQuery>(MessagesDocument, {
    variables: { channelId },
  });

  const [Remove] = useMutation<RemoveFriendMutation>(RemoveFriendDocument);
  const [Block] = useMutation<BlockMutation>(BlockDocument);

  const query = data?.messages;
  const messages = query && query.messages;
  const channel = query && query.channel;
  const server = channel && !channel.ptChat;
  const friend = query && channel && channel.ptChat && query.friend;
  const firstMessage = messages && messages[0];

  if (fetch) {
    refetch();
    isFetch(false);
  }

  async function RemoveFriend() {
    if (!friend) return;

    const params = { nameId: friend.nameId, userId: friend.userId };

    await Remove({ variables: { params } });

    isFetch(true);
    useRouter().push("/@me");
  }

  async function BlockFriend() {
    if (!friend) return;

    const params = { nameId: friend.nameId, userId: friend.userId };

    await Block({ variables: { params } });

    isFetch(true);
    useRouter().push("/@me");
  }

  if (loading) return <Loader />;

  return (
    <main
      className={`flex-col justify-between
    "w-full h-screen
     `}
    >
      <section className="shadow shadow-darkish">
        {channel && server && (
          <div className="flex justify-between items-center">
            <h1 className="text-gray-200 m-3">
              {channel.name}
              <span>{channel.desc && "-"}</span>
              <span>{channel.desc ?? ""}</span>
            </h1>

            <button
              onClick={() => setSize(!size)}
              className="mx-4 text-gray-300 hover:text-gray-400 cursor-pointer"
            >
              {User}
            </button>
          </div>
        )}
        {channel && !server && <Header id={friend} />}
      </section>

      <section className="flex-col-reverse gap-3 my-4 overflow-auto h-full w-full  bg-background dark:bg-background">
        {channel && (
          <>
            {!server && friend && (
              <div className="w-full flex flex-col items-start gap-4 leading-6">
                <div className="flex flex-col gap-4 mx-3">
                  <span
                    style={{ backgroundColor: friend.iconId }}
                    className={`
                  w-20 h-20 max-w-20 max-h-20 rounded-full
                `}
                  />
                  <h1 className="text-gray-200 text-[32px] font-bold font-sans my-1">
                    {friend.nameId}
                  </h1>
                  <h2 className="text-gray-200 text-[24px] font-semibold font-sans my-1">
                    {friend.nameId}#{friend.userId}
                  </h2>
                  <strong className="text-[#b5bac1] font-normal whitespace-nowrap">
                    This is the beginning of your direct message history with{" "}
                    <span className="text-gray-400 font-semibold">
                      {friend.nameId}
                    </span>
                  </strong>

                  <div className="flex items-center gap-2 text-sm font-normal whitespace-nowrap text-gray-400">
                    <h1>No servers in common</h1>
                    <span className="p-0.5 bg-dash rounded-full" />

                    <div className="flex items-center gap-2 text-sm">
                      <button
                        onClick={() => RemoveFriend()}
                        className="bg-[#4e5058] hover:bg-highlight transition-all border border-[#4e5058] text-white px-3 py-0.5 rounded"
                      >
                        Remove Friend
                      </button>
                      <button
                        onClick={() => BlockFriend()}
                        className="bg-[#4e5058] hover:bg-highlight transition-all border border-[#4e5058] text-white px-3 py-0.5 rounded"
                      >
                        Block
                      </button>
                    </div>
                  </div>
                </div>

                {messages && <Messages msgs={messages} />}
              </div>
            )}

            {server && <>{messages && <Messages msgs={messages} />}</>}
          </>
        )}
      </section>
      <section className="m-3">
        <Input channelId={channelId} isFetch={isFetch} />
      </section>
    </main>
  );
};
