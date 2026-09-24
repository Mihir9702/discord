import React, { useState } from "react";
import { FriendRequest } from "../../types/friendrequest";
import { Check, Cross } from "../Icons";
import { useMutation } from "@apollo/client";
import {
  AcceptFriendRequestMutation,
  AcceptFriendRequestDocument,
  DeclineFriendRequestMutation,
  DeclineFriendRequestDocument,
  CancelFriendRequestMutation,
  CancelFriendRequestDocument,
} from "../../graphql";
import UserIcon from "../UserIcon";
import Tooltip from "../Tooltip";

export default ({ friends }: { friends: FriendRequest[] }) => {
  const [error, setError] = useState("");

  // refetch so the request disappears right away
  const options = { refetchQueries: ["UserFriends", "PartyChats"] };

  const [accept] = useMutation<AcceptFriendRequestMutation>(
    AcceptFriendRequestDocument,
    options
  );
  const [decline] = useMutation<DeclineFriendRequestMutation>(
    DeclineFriendRequestDocument,
    options
  );
  const [cancel] = useMutation<CancelFriendRequestMutation>(
    CancelFriendRequestDocument,
    options
  );

  type Mutate = (options: {
    variables: { params: { nameId: string; userId: number } };
  }) => Promise<unknown>;

  async function act(mutate: Mutate, req: FriendRequest) {
    setError("");
    try {
      await mutate({
        variables: { params: { nameId: req.nameId, userId: req.userId } },
      });
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  if (!friends || friends.length === 0) {
    return (
      <main className="w-full h-full flex items-center justify-center text-gray-400 font-normal p-6">
        There are no pending friend requests. Here's Wumpus for now.
      </main>
    );
  }

  return (
    <main className="w-full p-6">
      <h1 className="my-2 sm:text-sm text-gray-400 font-semibold font-gg uppercase">
        Pending — {friends.length}
      </h1>
      {error && <p className="text-sm text-red-400 my-2">{error}</p>}
      {friends.map((req) => (
        <section
          key={`${req.nameId}#${req.userId}`}
          className="group flex items-center justify-between py-2.5 px-2 -mx-2 w-full border-t border-dash rounded-lg hover:bg-highlight"
        >
          <div className="flex items-center gap-3">
            <UserIcon iconId={req.iconId} name={req.nameId} />
            <div>
              <h1 className="text-gray-200">
                {req.nameId}
                <span className="text-gray-400 hidden group-hover:inline">
                  #{req.userId}
                </span>
              </h1>
              <h2 className="text-gray-400 text-sm font-light">
                {req.status === "incoming" ? "Incoming" : "Outgoing"} Friend
                Request
              </h2>
            </div>
          </div>

          <div className="flex flex-row justify-end gap-3">
            {req.status === "incoming" && (
              <Tooltip content="Accept">
                <button
                  onClick={() => act(accept, req)}
                  className="bg-darkish hover:bg-dark hover:text-green-500 text-white p-2 rounded-full"
                >
                  {Check}
                </button>
              </Tooltip>
            )}
            <Tooltip content={req.status === "incoming" ? "Ignore" : "Cancel"}>
              <button
                onClick={() =>
                  act(req.status === "incoming" ? decline : cancel, req)
                }
                className="bg-darkish hover:bg-dark hover:text-red-500 text-white p-2 rounded-full"
              >
                {Cross}
              </button>
            </Tooltip>
          </div>
        </section>
      ))}
    </main>
  );
};
