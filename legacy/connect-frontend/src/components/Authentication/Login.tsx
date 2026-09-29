import React from "react";
import Link from "next/link";

export default () => {
  return (
    <div className="flex flex-col justify-start gap-1 w-full">
      <button
        type="submit"
        className="bg-lightblue hover:bg-darkblue text-white font-bold transition-all shadow-sm shadow-black py-2 w-full rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <span className="text-sm text-gray-500">
        Need an account?{" "}
        <Link
          href={"/signup"}
          className="text-left text-blue-500 hover:underline"
        >
          Register
        </Link>
      </span>
    </div>
  );
};
