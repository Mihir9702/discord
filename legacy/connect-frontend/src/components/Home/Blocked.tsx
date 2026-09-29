import React from "react";
import { User } from "src/graphql";

export default ({ friends }: { friends: User[] }) => {
  const len = friends?.length;
  return (
    <main className="w-full h-full">
      <h1 className="mx-3 my-1 sm:text-xs text-text uppercase">
        {len > 0 && <h1>Blocked - {len}</h1>}
      </h1>
      {friends?.map((friend) => (
        <section className="flex items-center justify-between p-3 w-full hover:bg-mid">
          <div>
            <h1 className="text-gray-200">
              {friend.nameId} # <span>{friend.userId}</span>
            </h1>
            <h2 className="text-gray-400">{friend.status}</h2>
          </div>
        </section>
      ))}
    </main>
  );
};
