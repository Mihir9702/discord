import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  SendFriendRequestDocument,
  SendFriendRequestMutation,
} from "src/graphql";
import { Compass, Search } from "../Icons";
import { DispatchBool } from "src/types/dispatch";

export default ({ fetch }: { fetch: DispatchBool }) => {
  const [input, isInput] = useState("");
  const [result, setResult] = useState("");

  const [sendFriendRequest] = useMutation<SendFriendRequestMutation>(
    SendFriendRequestDocument
  );
  const [ux, setUX] = useState("border-lightdark");

  async function add(e: any) {
    e.preventDefault();

    function success() {
      setUX("border-green-500");
      setResult("success");
      isInput("");
      fetch(true);
    }

    function failed() {
      setUX("border-red-500");
      setResult("failed");
    }

    if (input === "") return failed();
    if (!input.includes("#")) return failed();
    if (input.split("#").length !== 2) return failed();
    if (input.split("#")[0].length < 3) return failed();
    if (input.split("#")[1].length !== 4) return failed();
    if (isNaN(Number(input.split("#")[1]))) return failed();

    await sendFriendRequest({
      variables: {
        params: {
          nameId: input.split("#")[0],
          userId: Number(input.split("#")[1]),
        },
      },
    })
      .then(({ errors }) => {
        if (errors) {
          console.error(errors[0].message);
          return failed();
        } else {
          return success();
        }
      })
      .catch((e) => {
        console.error(e);
        return failed();
      })
      .finally(() => {
        setTimeout(() => {
          setUX("border-lightdark");
          setResult("");
        }, 2000);
      });
  }

  const errorMessage = (
    <p className="text-sm text-red-500">
      Failed: User not found. Please try again.
    </p>
  );
  const successMessage = (
    <p className="text-sm text-green-500">Success: Friend request sent.</p>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col text-gray-400 m-10 my-6 gap-2">
        <h1 className="uppercase font-bold text-white text-lg">Add Friend</h1>
        <p>ItS cAsE sEnSiTiVe</p>
        {result === "failed"
          ? errorMessage
          : result === "success"
          ? successMessage
          : ""}

        <form
          onSubmit={add}
          className={`flex items-center justify-between rounded-md outline-0 border ${ux} w-full max-w-[400px] bg-lightdark`}
        >
          <input
            type="text"
            className={`px-3 py-2 max-w-max bg-transparent focus:outline-0 focus:${
              result === "failed"
                ? "text-red-500"
                : result === "success"
                ? "text-green-500"
                : 0
            }`}
            placeholder="Username#0000"
            name={input}
            value={input}
            onChange={(e) => isInput(e.target.value)}
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
