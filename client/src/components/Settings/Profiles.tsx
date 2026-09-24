import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UpdateUserDocument, UpdateUserMutation } from "src/graphql";
import { User } from "src/types/query";
import UserIcon from "../UserIcon";

const swatches = [
  "#5865f2",
  "#3ba55c",
  "#faa61a",
  "#ed4245",
  "#eb459e",
  "#9b59b6",
  "#1abc9c",
  "#747f8d",
];

export default ({ me }: { me: User }) => {
  const [nameId, setNameId] = useState(me.nameId);
  const [iconId, setIconId] = useState(me.iconId);
  const [status, setStatus] = useState("");
  const [update, { loading }] =
    useMutation<UpdateUserMutation>(UpdateUserDocument);

  const changed = nameId.trim() !== me.nameId || iconId !== me.iconId;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    try {
      await update({
        variables: {
          params: {
            nameId: nameId.trim() !== me.nameId ? nameId : undefined,
            iconId: iconId !== me.iconId ? iconId : undefined,
          },
        },
      });
      setStatus("Saved!");
    } catch (ex: any) {
      setStatus(ex.message);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6 font-normal">
      <h1 className="text-xl font-semibold text-white">Profiles</h1>

      <div className="flex gap-10 items-start">
        <div className="flex-1 flex flex-col gap-6">
          <label className="text-xs uppercase font-bold text-gray-400">
            Display Name
            <input
              value={nameId}
              maxLength={32}
              onChange={(e) => setNameId(e.target.value)}
              className="mt-2 w-full bg-darkish text-gray-200 rounded p-2.5 focus:outline-none font-normal normal-case text-md"
            />
          </label>

          <div>
            <h2 className="text-xs uppercase font-bold text-gray-400 mb-2">
              Avatar Color
            </h2>
            <div className="flex flex-wrap gap-2 items-center">
              {swatches.map((color) => (
                <button
                  type="button"
                  key={color}
                  title={color}
                  onClick={() => setIconId(color)}
                  className={`w-8 h-8 rounded ${
                    iconId.toLowerCase() === color ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <label
                title="Custom color"
                className="w-8 h-8 rounded border border-dash overflow-hidden cursor-pointer"
              >
                <input
                  type="color"
                  value={iconId}
                  onChange={(e) => setIconId(e.target.value)}
                  className="w-12 h-12 -m-2 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={!changed || loading}
              className="px-4 py-2 rounded text-sm text-white bg-lightblue hover:bg-darkblue transition-all disabled:opacity-50"
            >
              Save Changes
            </button>
            {status && (
              <p
                className={`text-sm ${
                  status === "Saved!" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>

        {/* preview */}
        <div className="w-72 bg-darkish rounded-lg overflow-hidden shrink-0">
          <div className="h-16" style={{ backgroundColor: iconId }} />
          <div className="px-4 -mt-10">
            <div className="rounded-full border-[6px] border-darkish w-fit">
              <UserIcon
                iconId={iconId}
                status={me.status}
                name={nameId}
                size="lg"
              />
            </div>
          </div>
          <div className="m-3 p-3 bg-mid rounded-lg">
            <h1 className="text-lg font-semibold text-white truncate">
              {nameId || me.nameId}
            </h1>
            <p className="text-sm text-gray-400">{me.username}</p>
          </div>
        </div>
      </div>
    </form>
  );
};
