import React from "react";
import Link from "next/link";
import { Box, Plus, User } from "../Icons";
import { useRouter } from "next/router";

export default () => {
  const [_, r] = React.useState(false);
  const router = useRouter();
  const link = "flex gap-3 p-3 font-light rounded-md hover:bg-highlight";
  const main = "flex flex-col mt-8 gap-1 ml-3 w-[90%] text-gray-400";
  return (
    <main className={main}>
      <button
        onClick={() => r(false)}
        className={
          link +
          (router.pathname !== "/store"
            ? " bg-highlight text-white font-semibold"
            : "")
        }
      >
        {User} Friends
      </button>
      <button
        onClick={() => r(true)}
        className={
          link +
          (router.pathname === "/store"
            ? " bg-highlight text-white font-semibold"
            : "")
        }
      >
        {Box} Remix
      </button>
      <section
        className="flex justify-between items-center
			text-gray-400 hover:text-gray-200
			cursor-pointer my-2"
      >
        <p className="uppercase text-sm font-semibold font-gg">
          Direct Messages
        </p>
        <p className="cursor-pointer">{Plus}</p>
      </section>
    </main>
  );
};
