import AddFriend from "./AddFriend";
import Blocked from "./Blocked";
import Friends from "./Friends";
import Header from "./Header";
import Pending from "./Pending";
import { useState } from "react";
import { UserFriendsDocument, UserFriendsQuery } from "src/graphql";
import { useQuery } from "@apollo/client";
import { UserSkeleton } from "../Skeleton";

export default () => {
  const [state, setState] = useState("online");

  const { data, loading } = useQuery<UserFriendsQuery>(UserFriendsDocument);

  const friends = data?.userFriends?.friends || [];
  const friendRequests = data?.userFriends?.friendRequests || [];
  const blocked = data?.userFriends?.blocked || [];
  const incoming = friendRequests.filter((r) => r.status === "incoming");

  return (
    <main className="bg-background flex-1 min-w-0 h-screen relative flex flex-col">
      <Header state={state} setState={setState} pending={incoming.length} />
      <hr className="border-lightdark" />

      <section className="flex-1 min-h-0 flex items-start">
        <div className="h-full w-full overflow-y-auto">
          {loading && !data ? (
            <div className="p-6">
              <UserSkeleton />
            </div>
          ) : (
            <>
              {state === "online" && (
                <Friends friends={friends} online={true} />
              )}
              {state === "all" && <Friends friends={friends} />}
              {state === "pending" && <Pending friends={friendRequests} />}
              {state === "blocked" && <Blocked friends={blocked} />}
              {state === "add" && <AddFriend />}
            </>
          )}
        </div>
        {/* <Active /> */}
      </section>
    </main>
  );
};
