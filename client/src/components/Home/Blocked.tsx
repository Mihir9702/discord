import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UnblockDocument, UnblockMutation } from "src/graphql";
import { BlockedUser } from "src/types/friend";
import UserIcon from "../UserIcon";

export default ({ friends }: { friends: BlockedUser[] }) => {
  const [error, setError] = useState("");
  const [unblock] = useMutation<UnblockMutation>(UnblockDocument, {
    refetchQueries: ["UserFriends"],
  });

  async function Unblock(user: BlockedUser) {
    setError("");
    try {
      await unblock({
        variables: { params: { nameId: user.nameId, userId: user.userId } },
      });
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  if (!friends || friends.length === 0) {
    return (
      <main className="w-full h-full flex items-center justify-center text-gray-400 font-normal p-6">
        You can't unblock the Wumpus.
      </main>
    );
  }

  return (
    <main className="w-full p-6">
      <h1 className="my-2 sm:text-sm text-gray-400 font-semibold font-gg uppercase">
        Blocked — {friends.length}
      </h1>
      {error && <p className="text-sm text-red-400 my-2">{error}</p>}
      {friends.map((friend) => (
        <section
          key={friend.id}
          className="group flex items-center justify-between py-2.5 px-2 -mx-2 w-full border-t border-dash rounded-lg hover:bg-highlight"
        >
          <div className="flex items-center gap-3">
            <UserIcon iconId={friend.iconId} name={friend.nameId} />
            <div>
              <h1 className="text-gray-200">
                {friend.nameId}
                <span className="text-gray-400">#{friend.userId}</span>
              </h1>
              <h2 className="text-gray-400 text-sm font-light">Blocked</h2>
            </div>
          </div>
          <button
            onClick={() => Unblock(friend)}
            className="bg-darkish hover:bg-dark text-gray-200 hover:text-white text-sm px-3 py-1.5 rounded"
          >
            Unblock
          </button>
        </section>
      ))}
    </main>
  );
};
