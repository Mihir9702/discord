import AddFriend from "./AddFriend";
import Blocked from "./Blocked";
import Friends from "./Friends";
import Header from "./Header";
import Pending from "./Pending";
import { useState } from "react";
import { UserFriendsDocument, UserFriendsQuery } from "src/graphql";
import { useQuery } from "@apollo/client";
import Active from "./Active";
import { DispatchBool } from "src/types/dispatch";

export default ({ fetchChats }: { fetchChats: DispatchBool }) => {
  const [state, setState] = useState("online");
  const [get, fetchFriends] = useState(false);

  const { data, loading, refetch } =
    useQuery<UserFriendsQuery>(UserFriendsDocument);

  const friends = data?.userFriends?.friends as any[];
  const friendRequests = data?.userFriends?.friendRequests as any[];
  const blocked = data?.userFriends?.blocked as any[];

  if (get) refetch();

  if (loading) {
    return (
      // todo fix header width
      <header className="fixed top-0 right-0 w-full md:max-w-[1350px] sm:max-w-2xl">
        <Header state={state} setState={setState} />
        <hr className="border-lightdark" />
      </header>
    );
  }

  return (
    <main className="bg-background w-full relative flex flex-col">
      <Header state={state} setState={setState} />
      <hr className="border-lightdark" />

      <section className="h-full flex items-start">
        <div className="h-full w-full">
          {state === "online" && <Friends friends={friends} online={true} />}
          {state === "all" && <Friends friends={friends} />}
          {state === "pending" && (
            <Pending friends={friendRequests} fetchChats={fetchChats} />
          )}
          {state === "blocked" && <Blocked friends={blocked} />}
          {state === "add" && <AddFriend fetch={fetchFriends} />}
        </div>
        {/* <Active /> */}
      </section>
    </main>
  );
};
