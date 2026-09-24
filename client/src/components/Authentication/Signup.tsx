import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default () => {
  const { query } = useRouter();
  const href = {
    pathname: "/login",
    query: query.next ? { next: query.next } : {},
  };

  return (
    <div className="flex flex-col justify-start gap-1 w-full">
      <button
        type="submit"
        className="bg-lightblue hover:bg-darkblue text-white shadow-sm shadow-black font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
      >
        Signup
      </button>
      <Link href={href} className="text-blue-500 text-sm hover:underline">
        Already have an account?
      </Link>
    </div>
  );
};
