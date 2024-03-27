import React from "react";
import UserIcon from "../UserIcon";

export default ({ nameId, iconId, status }: AccountUser) => {
  return (
    <div className="flex flex-col items-center my-4 gap-4 font-normal">
      <article className="flex justify-between items-center border border-blue-500 w-1/2 p-4">
        <div className="flex items-center self-start gap-4">
          {status && iconId && <UserIcon status={status} iconId={iconId} />}
          <h1>{nameId}</h1>
        </div>
        <button
          className="bg-lightblue hover:bg-darkblue text-white transition-all shadow-sm shadow-black
                   p-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Edit User Profile
        </button>
      </article>

      <hr className="border-[1px] w-1/2 mx-1 border-dash" />

      <article className="flex justify-between items-center border border-blue-500 w-1/2 p-4">
        <h1 className="text-lg">Password Authentication</h1>
        <button
          className="bg-lightblue hover:bg-darkblue text-white transition-all shadow-sm shadow-black
                   p-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      </article>

      <hr className="border-[1px] w-1/2 mx-1 border-dash" />

      <article className="flex flex-col justify-between items-start gap-4 border border-blue-500 w-1/2 p-4">
        <h1 className="text-lg">Account Removal</h1>
        <div className="flex gap-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white transition-all shadow-sm shadow-black
                   p-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Disable Account
          </button>

          <button
            className="border border-red-500 hover:bg-red-500 text-white transition-all shadow-sm shadow-black
                   p-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Account
          </button>
        </div>
      </article>
    </div>
  );
};
