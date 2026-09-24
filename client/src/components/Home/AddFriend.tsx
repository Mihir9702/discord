import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  SendFriendRequestDocument,
  SendFriendRequestMutation,
} from "src/graphql";
import { Compass, Search } from "../Icons";

export default () => {
  const [input, isInput] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const [sendFriendRequest] = useMutation<SendFriendRequestMutation>(
    SendFriendRequestDocument,
    { refetchQueries: ["UserFriends", "PartyChats"] }
  );
  const [ux, setUX] = useState("border-lightdark");

  async function add(e: React.FormEvent) {
    e.preventDefault();

    function success() {
      setUX("border-green-500");
      setResult("success");
      setMessage(`Success! Your friend request to ${input.trim()} was sent.`);
      isInput("");
    }

    function failed(reason: string) {
      setUX("border-red-500");
      setResult("failed");
      setMessage(reason);
    }

    const [nameId, userId] = input.trim().split("#");
    const format = "Hm, didn't work. Double check the format is Name#0000.";

    if (!nameId || !userId || input.split("#").length !== 2) {
      return failed(format);
    }
    if (userId.length !== 4 || isNaN(Number(userId))) return failed(format);

    try {
      await sendFriendRequest({
        variables: {
          params: { nameId: nameId.trim(), userId: Number(userId) },
        },
      });
      success();
    } catch (ex: any) {
      failed(ex.message);
    }
  }

  const errorMessage = <p className="text-sm text-red-500">{message}</p>;
  const successMessage = <p className="text-sm text-green-500">{message}</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col text-gray-400 m-10 my-6 gap-2">
        <h1 className="uppercase font-bold text-white text-lg">Add Friend</h1>
        <p>
          You can add friends with their Name#0000 tag. ItS cAsE sEnSiTiVe
        </p>
        {result === "failed"
          ? errorMessage
          : result === "success"
          ? successMessage
          : ""}

        <form
          onSubmit={add}
          className={`flex items-center justify-between rounded-md outline-0 border ${ux} w-full max-w-[600px] bg-lightdark`}
        >
          <input
            type="text"
            className="px-3 py-2 w-full bg-transparent text-gray-200 focus:outline-0"
            placeholder="Name#0000"
            name="friend"
            value={input}
            onChange={(e) => {
              isInput(e.target.value);
              setResult("");
              setUX("border-lightdark");
            }}
          />
          <button
            type="submit"
            className={`h-full px-2 border-l border-l-background text-gray-50 hover:text-text ${
              !input && "cursor-not-allowed text-gray-500 hover:text-gray-500"
            }`}
            disabled={!input}
          >
            {Search}
          </button>
        </form>
      </div>
      <hr className="w-full border-1 border-dash" />
      <div className="flex flex-col text-gray-400 m-8">
        <h1 className="uppercase text-white font-bold text-lg mx-2 mb-4">
          Other Places to Make Friends
        </h1>
        <div className="flex items-center gap-2 bg-mid hover:bg-background border border-gray-700 rounded-lg max-w-md p-3">
          <p className="p-2 bg-green-600 text-white rounded-md">{Compass}</p>
          <p className="text-gray-200 font-semibold text-md">
            Explore Discoverable Servers
          </p>
        </div>
        {/* do something here */}
        {/* ** on serverlist compass icon + discover layout */}
      </div>

      {/* do something here */}
      {/* right column ACTIVE NOW */}
    </div>
  );
};
