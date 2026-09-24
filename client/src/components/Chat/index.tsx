import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  MessagesQuery,
  MessagesDocument,
  RemoveFriendMutation,
  RemoveFriendDocument,
  BlockMutation,
  BlockDocument,
  UnblockMutation,
  UnblockDocument,
  SendFriendRequestMutation,
  SendFriendRequestDocument,
  UserFriendsQuery,
  UserFriendsDocument,
} from "src/graphql";
import Loader from "../Loader";
import Input from "./Input";
import Header from "./Header";
import Messages from "./Messages";
import UserIcon from "../UserIcon";
import Confirm from "../Confirm";
import Tooltip from "../Tooltip";
import { Hash, People } from "../Icons";
import { DispatchBool } from "src/types/dispatch";
import { sameUser, useRole } from "src/utils/useMe";

interface Props {
  size: boolean;
  setSize: DispatchBool;
}

export default ({ size, setSize }: Props) => {
  const router = useRouter();
  const [confirm, setConfirm] = useState<"remove" | "block" | null>(null);
  const [error, setError] = useState("");

  // /@me/[channelId] for dms, /@me/[serverId]/[channelId] for servers
  const channelId = (router.query.channel || router.query.id) as string;
  const serverId = router.query.channel ? Number(router.query.id) : 0;
  const { manage } = useRole(serverId);

  const { data, loading } = useQuery<MessagesQuery>(MessagesDocument, {
    variables: { channelId },
    skip: !channelId,
  });
  const { data: uf } = useQuery<UserFriendsQuery>(UserFriendsDocument);

  const refetchQueries = ["UserFriends", "PartyChats"];
  const [Remove] = useMutation<RemoveFriendMutation>(RemoveFriendDocument, {
    refetchQueries,
  });
  const [Block] = useMutation<BlockMutation>(BlockDocument, { refetchQueries });
  const [Unblock] = useMutation<UnblockMutation>(UnblockDocument, {
    refetchQueries,
  });
  const [Add] = useMutation<SendFriendRequestMutation>(
    SendFriendRequestDocument,
    { refetchQueries }
  );

  const query = data?.messages;
  const messages = query?.messages || [];
  const channel = query?.channel;
  const server = !!channel && !channel.ptChat;
  const friend = channel?.ptChat ? query?.friend : null;

  if (loading && !data) return <Loader />;

  if (!channel) {
    return (
      <main className="h-screen flex flex-col items-center justify-center gap-3 text-gray-400 font-normal bg-background">
        <p>This channel doesn't exist or you don't have access to it.</p>
        <Link href="/@me" className="text-lightblue hover:underline">
          Go home
        </Link>
      </main>
    );
  }

  const params = friend
    ? { nameId: friend.nameId, userId: friend.userId }
    : undefined;
  const friends = uf?.userFriends;
  const isFriend = !!friends?.friends?.some((f) => sameUser(f, friend));
  const isBlocked = !!friends?.blocked?.some((f) => sameUser(f, friend));
  const requested = !!friends?.friendRequests?.some((r) => sameUser(r, friend));

  async function run(action: () => Promise<unknown>) {
    setError("");
    try {
      await action();
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  const button =
    "bg-[#4e5058] hover:bg-highlight transition-all border border-[#4e5058] text-white px-3 py-0.5 rounded";

  return (
    <main className="flex flex-col h-screen w-full bg-background">
      <section className="shadow shadow-darkish min-h-[48px] flex items-center shrink-0 z-10">
        {server && (
          <div className="flex justify-between items-center w-full">
            <h1 className="text-gray-200 mx-3 flex items-center gap-2 min-w-0">
              <span className="text-gray-400">{Hash}</span>
              <span className="font-semibold">{channel.name}</span>
              {channel.desc && (
                <>
                  <span className="w-px h-6 bg-dash mx-2" />
                  <span className="text-sm text-gray-400 font-light truncate">
                    {channel.desc}
                  </span>
                </>
              )}
            </h1>

            <Tooltip content={size ? "Hide Member List" : "Show Member List"}>
              <button
                aria-label="Member List"
                onClick={() => setSize(!size)}
                className={`mx-4 hover:text-gray-200 cursor-pointer ${
                  size ? "text-white" : "text-gray-400"
                }`}
              >
                {People}
              </button>
            </Tooltip>
          </div>
        )}
        {friend && <Header id={friend} size={size} setSize={setSize} />}
      </section>

      {/* column-reverse keeps the view pinned to the newest message */}
      <section className="flex-1 min-h-0 overflow-y-auto flex flex-col-reverse">
        <div className="flex flex-col pb-4">
          {friend && (
            <div className="w-full flex flex-col items-start gap-4 leading-6 mt-8">
              <div className="flex flex-col gap-4 mx-4">
                <UserIcon
                  iconId={friend.iconId}
                  name={friend.nameId}
                  size="lg"
                />
                <h1 className="text-gray-200 text-[32px] font-bold font-sans my-1">
                  {friend.nameId}
                </h1>
                <h2 className="text-gray-200 text-[24px] font-semibold font-sans my-1">
                  {friend.nameId}#{friend.userId}
                </h2>
                <strong className="text-[#b5bac1] font-normal">
                  This is the beginning of your direct message history with{" "}
                  <span className="text-gray-400 font-semibold">
                    {friend.nameId}
                  </span>
                </strong>

                <div className="flex items-center gap-2 text-sm font-normal whitespace-nowrap text-gray-400">
                  {isFriend && (
                    <button
                      onClick={() => setConfirm("remove")}
                      className={button}
                    >
                      Remove Friend
                    </button>
                  )}
                  {!isFriend && !isBlocked && (
                    <button
                      disabled={requested}
                      onClick={() => run(() => Add({ variables: { params } }))}
                      className={`${button} !bg-lightblue !border-lightblue disabled:opacity-50`}
                    >
                      {requested ? "Friend Request Sent" : "Add Friend"}
                    </button>
                  )}
                  {isBlocked ? (
                    <button
                      onClick={() =>
                        run(() => Unblock({ variables: { params } }))
                      }
                      className={button}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirm("block")}
                      className={button}
                    >
                      Block
                    </button>
                  )}
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
            </div>
          )}

          {server && (
            <div className="mx-4 mt-8 flex flex-col gap-2">
              <div className="w-16 h-16 rounded-full bg-highlight text-white flex items-center justify-center scale-125 origin-left">
                {Hash}
              </div>
              <h1 className="text-white text-[32px] font-bold mt-2">
                Welcome to #{channel.name}!
              </h1>
              <p className="text-gray-400 font-normal">
                This is the start of the #{channel.name} channel.
              </p>
            </div>
          )}

          <Messages msgs={messages} manage={server && manage} />
        </div>
      </section>

      <section className="m-3 mt-0 shrink-0">
        <Input
          channelId={channelId}
          placeholder={server ? `#${channel.name}` : `@${friend?.nameId || ""}`}
          disabled={isBlocked}
        />
      </section>

      {confirm === "remove" && friend && (
        <Confirm
          title={`Remove '${friend.nameId}'`}
          confirm="Remove Friend"
          danger
          onClose={() => setConfirm(null)}
          onConfirm={() => Remove({ variables: { params } })}
        >
          Are you sure you want to permanently remove{" "}
          <strong>{friend.nameId}</strong> from your friends?
        </Confirm>
      )}

      {confirm === "block" && friend && (
        <Confirm
          title={`Block '${friend.nameId}'`}
          confirm="Block"
          danger
          onClose={() => setConfirm(null)}
          onConfirm={() => Block({ variables: { params } })}
        >
          Are you sure you want to block <strong>{friend.nameId}</strong>?
          Blocking will also remove them from your friends list, and neither of
          you will be able to message the other.
        </Confirm>
      )}
    </main>
  );
};
