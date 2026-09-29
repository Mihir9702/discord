import React from "react";
import { Friend } from "../../types/friend";
import { reverseElements } from "src/utils/reverseElements";
import { MessageSquare } from "../Icons";

interface Props {
  friends: Friend[];
  online?: boolean;
}

export default ({ friends, online = false }: Props) => {
  friends && friends.map((friend) => console.log(friend.iconId));
  if (online) {
    const online = friends?.filter((friend) => friend.status === "online");
    const len = friends?.length;
    return (
      <main className="w-full h-full p-6">
        <input
          type="text"
          placeholder="Search"
          className="bg-darkish p-1 placeholder:text-md placeholder:font-light text-md font-light focus:outline-0 text-gray-200 w-full my-2 rounded"
        />
        <h1 className="my-2 sm:text-sm text-gray-400 font-semibold font-gg uppercase">
          {len > 0 && <h1>Online - {len}</h1>}
        </h1>
        {reverseElements(online).map((friend) => (
          <div key={friend.nameId}>
            <hr className="border-dash w-full mb-1" />
            <section className="flex flex-col items-start font-light justify-between py-1.5 w-full hover:bg-mid">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <button
                    onClick={() => {}} // ???
                    className="status-button flex items-center"
                  >
                    <div className="relative inline-block">
                      <div
                        // todo image here
                        className={`w-8 h-8 rounded-full self-center`}
                        style={{ backgroundColor: friend.iconId }}
                      />
                      <span
                        className={`
                    ${
                      friend.status === "online"
                        ? "bg-online"
                        : friend.status === "offline"
                        ? "bg-offline"
                        : friend.status === "idle"
                        ? "bg-idle"
                        : "bg-dnd"
                    }
                    absolute bottom-0 right-0.5 w-3 h-3 rounded-full
                  `}
                      />
                    </div>
                  </button>
                  <div>
                    <h1 className="text-gray-300 font-gg text-md">
                      {friend.nameId}#<span>{friend.userId}</span>
                    </h1>
                    <h2 className="text-gray-400 text-sm font-gg">
                      {friend.status[0].toUpperCase() + friend.status.slice(1)}
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </main>
    );
  } else {
    const len = friends?.length;
    return (
      <main className="p-6 w-full h-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-darkish p-1 placeholder:text-md placeholder:font-light text-md font-light focus:outline-0 text-gray-200 w-full my-2 rounded"
        />
        <h1 className="my-2 sm:text-sm text-text uppercase">
          {len > 0 && <h1>All Friends - {len}</h1>}
        </h1>
        {reverseElements(friends).map((friend) => (
          <section className="flex items-center font-light justify-between p-3 w-full hover:bg-mid">
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
  }
};
