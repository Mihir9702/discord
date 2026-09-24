import React from "react";
import Link from "next/link";
import { Box, Plus, User } from "../Icons";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const link = "flex gap-3 p-3 font-light rounded-md hover:bg-highlight";
  const main = "flex flex-col mt-4 gap-1 mx-2 text-gray-400";
  const friends = router.pathname === "/@me";

  return (
    <main className={main}>
      <Link
        href="/@me"
        className={
          link + (friends ? " bg-highlight text-white font-semibold" : "")
        }
      >
        {User} Friends
      </Link>
      <button
        disabled
        title="Coming soon"
        className={link + " cursor-not-allowed opacity-60"}
      >
        {Box} Remix
      </button>
      <section
        className="flex justify-between items-center
			text-gray-400 hover:text-gray-200
			my-2 mx-1"
      >
        <p className="uppercase text-sm font-semibold font-gg">
          Direct Messages
        </p>
        <Link href="/@me" title="Add friends to start a conversation">
          {Plus}
        </Link>
      </section>
    </main>
  );
};
