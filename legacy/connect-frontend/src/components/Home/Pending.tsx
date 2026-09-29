import React from "react";
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
import { DispatchBool } from "src/types/dispatch";

export default ({
  friends,
  fetchChats,
}: {
  friends: FriendRequest[];
  fetchChats: DispatchBool;
}) => {
  const len = friends?.length;

  const [accept] = useMutation<AcceptFriendRequestMutation>(
    AcceptFriendRequestDocument
  );
  const [decline] = useMutation<DeclineFriendRequestMutation>(
    DeclineFriendRequestDocument
  );
  const [cancel] = useMutation<CancelFriendRequestMutation>(
    CancelFriendRequestDocument
  );

  async function Accept(req: FriendRequest) {
    const params = { nameId: req.nameId, userId: req.userId };

    const { errors } = await accept({
      variables: { params },
    });

    if (errors) {
      console.log(errors[0].message);
    } else {
      fetchChats(true);
    }
  }
  async function Decline(req: FriendRequest) {
    const params = { nameId: req.nameId, userId: req.userId };

    const { errors } = await decline({
      variables: { params },
    });

    if (errors) {
      console.log(errors[0].message);
    }
  }
  async function Cancel(req: FriendRequest) {
    const params = { nameId: req.nameId, userId: req.userId };

    const { errors } = await cancel({
      variables: { params },
    });

    if (errors) {
      console.log(errors[0].message);
    }
  }
  return (
    <main className="w-full h-full">
      <h1 className="mx-3 my-1 text-text uppercase">
        {len > 0 && <h1>Pending - {len}</h1>}
      </h1>
      {friends?.map((req) => (
        <section className="flex items-center justify-between p-3 w-full hover:bg-mid">
          <div>
            <h1 className="text-gray-200">
              {req.nameId}#<span>{req.userId}</span>
            </h1>
            <h2 className="text-gray-400">{req.status} friend request</h2>
          </div>

          <div className="flex flex-row justify-end gap-3">
            {req.status === "incoming" && (
              <button
                onClick={async () => await Accept(req)}
                className="bg-darkish hover:bg-dark hover:text-green-500 text-white p-2 rounded-full"
              >
                {Check}
              </button>
            )}
            <button
              onClick={async () =>
                req.status === "incoming"
                  ? await Decline(req)
                  : await Cancel(req)
              }
              className="bg-darkish hover:bg-dark hover:text-red-500 text-white p-2 rounded-full"
            >
              {Cross}
            </button>
          </div>
        </section>
      ))}
    </main>
  );
};
