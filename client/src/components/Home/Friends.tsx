import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  PartyChatsDocument,
  PartyChatsQuery,
  RemoveFriendDocument,
  RemoveFriendMutation,
} from "src/graphql";
import { Friend } from "../../types/friend";
import { Cross, MessageSquare } from "../Icons";
import UserIcon from "../UserIcon";
import Tooltip from "../Tooltip";
import Confirm from "../Confirm";

interface Props {
  friends: Friend[];
  online?: boolean;
}

export const statusLabel: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

export default ({ friends, online = false }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [removing, setRemoving] = useState<Friend | null>(null);

  const { data } = useQuery<PartyChatsQuery>(PartyChatsDocument);
  const [remove] = useMutation<RemoveFriendMutation>(RemoveFriendDocument, {
    refetchQueries: ["UserFriends"],
  });

  // online tab shows everyone who isn't offline (idle + dnd too)
  const list = friends
    .filter((friend) => !online || friend.status !== "offline")
    .filter((friend) =>
      `${friend.nameId}#${friend.userId}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
    .sort((a, b) => a.nameId.localeCompare(b.nameId));

  function message(friend: Friend) {
    const dm = data?.partyChats.find((c) =>
      c.users?.some((u) => u.id === friend.id)
    );
    if (dm) router.push(`/@me/${dm.channelId}`);
  }

  if (friends.length === 0 || (online && list.length === 0 && !search)) {
    return (
      <main className="w-full h-full flex flex-col items-center justify-center text-gray-400 font-normal p-6">
        <p>
          {online
            ? "No one's around to play with Wumpus."
            : "Wumpus is waiting on friends. You don't have to though!"}
        </p>
      </main>
    );
  }

  return (
    <main className="w-full p-6">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-darkish p-1 px-2 placeholder:text-md placeholder:font-light text-md font-light focus:outline-0 text-gray-200 w-full my-2 rounded"
      />
      <h1 className="my-2 sm:text-sm text-gray-400 font-semibold font-gg uppercase">
        {online ? "Online" : "All Friends"} — {list.length}
      </h1>
      {list.map((friend) => (
        <div
          key={friend.id}
          onClick={() => message(friend)}
          className="group border-t border-dash cursor-pointer"
        >
          <section className="flex items-center justify-between py-2.5 px-2 -mx-2 w-full rounded-lg hover:bg-highlight">
            <div className="flex items-center gap-3">
              <UserIcon
                iconId={friend.iconId}
                status={friend.status}
                name={friend.nameId}
              />
              <div>
                <h1 className="text-gray-200 font-gg text-md">
                  {friend.nameId}
                  <span className="text-gray-400 hidden group-hover:inline">
                    #{friend.userId}
                  </span>
                </h1>
                <h2 className="text-gray-400 text-sm font-gg font-light">
                  {statusLabel[friend.status] || friend.status}
                </h2>
              </div>
            </div>
            <div className="flex gap-3">
              <Tooltip content="Message">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    message(friend);
                  }}
                  className="bg-darkish text-gray-300 hover:text-white p-2 rounded-full"
                >
                  {MessageSquare}
                </button>
              </Tooltip>
              <Tooltip content="Remove Friend">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRemoving(friend);
                  }}
                  className="bg-darkish text-gray-300 hover:text-red-500 p-2 rounded-full"
                >
                  {Cross}
                </button>
              </Tooltip>
            </div>
          </section>
        </div>
      ))}
      {list.length === 0 && (
        <p className="text-gray-400 font-normal mt-4">
          Wumpus looked, but couldn't find anyone with that name.
        </p>
      )}

      {removing && (
        <Confirm
          title={`Remove '${removing.nameId}'`}
          confirm="Remove Friend"
          danger
          onClose={() => setRemoving(null)}
          onConfirm={() =>
            remove({
              variables: {
                params: { nameId: removing.nameId, userId: removing.userId },
              },
            })
          }
        >
          Are you sure you want to permanently remove{" "}
          <strong>{removing.nameId}</strong> from your friends?
        </Confirm>
      )}
    </main>
  );
};
