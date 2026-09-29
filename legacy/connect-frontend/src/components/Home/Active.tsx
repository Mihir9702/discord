import React from "react";

export default () => {
  return (
    <main
      className={`
        hidden hidden-1200
        h-full w-full max-w-[420px]
        border-l border-l-dash
        pointer-events-none select-none
      `}
    >
      <section className="m-4 flex flex-col space-y-4">
        <h1 className="font-gg font-semibold text-xl text-gray-100">
          Active Now
        </h1>
        <div className="flex text-center">
          {/* {friends.map((friend) => friend.online && <p>{friend.nameId}</p>)} */}
          <div className="flex flex-col justify-center mt-4 w-full font-normal font-gg">
            <p className="text-gray-100 text-lg font-semibold font-gg">
              Its quiet for now...
            </p>
            <p className="w-full text-gray-400 text-md max-w-xs place-self-center font-gg">
              When a friend starts an activity-like playing a game or hanging
              out on voice-we'll show it here!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
