import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { LeaveDocument, LeaveMutation } from "src/graphql";
import { ServerContext } from "src/utils/context";
import Confirm from "src/components/Confirm";
import { ServerMenuOptFC } from ".";

export default ({ onClose }: ServerMenuOptFC) => {
  const router = useRouter();
  const { s } = useContext(ServerContext);
  const [leave] = useMutation<LeaveMutation>(LeaveDocument, {
    refetchQueries: ["UserServers", "User"],
    awaitRefetchQueries: true,
  });

  if (!s) return null;

  return (
    <Confirm
      title={`Leave '${s.name}'`}
      confirm="Leave Server"
      danger
      onClose={onClose}
      onConfirm={async () => {
        await leave({ variables: { serverId: s.serverId } });
        router.push("/@me");
      }}
    >
      Are you sure you want to leave <strong>{s.name}</strong>? You won't be
      able to rejoin this server unless you are re-invited.
    </Confirm>
  );
};
