import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { DeleteServerDocument, DeleteServerMutation } from "src/graphql";
import { ServerContext } from "src/utils/context";
import Confirm from "src/components/Confirm";
import { ServerMenuOptFC } from ".";

// owner only - type the server name to confirm
export default ({ onClose }: ServerMenuOptFC) => {
  const router = useRouter();
  const { s } = useContext(ServerContext);
  const [name, setName] = useState("");
  const [remove] = useMutation<DeleteServerMutation>(DeleteServerDocument, {
    refetchQueries: ["UserServers", "User"],
    awaitRefetchQueries: true,
  });

  if (!s) return null;

  return (
    <Confirm
      title={`Delete '${s.name}'`}
      confirm="Delete Server"
      danger
      onClose={onClose}
      onConfirm={async () => {
        if (name !== s.name) {
          throw new Error("You didn't enter the server name correctly");
        }
        await remove({ variables: { serverId: s.serverId } });
        router.push("/@me");
      }}
    >
      <p className="bg-[#f0b132] text-white rounded p-2 text-sm mb-4">
        Are you sure you want to delete <strong>{s.name}</strong>? This action
        cannot be undone.
      </p>
      <label className="text-xs uppercase font-bold text-gray-400">
        Enter server name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full bg-darkish text-gray-200 rounded p-2 focus:outline-none font-normal normal-case text-md"
        />
      </label>
    </Confirm>
  );
};
