import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  InviteDocument,
  InviteQuery,
  JoinDocument,
  JoinMutation,
} from "src/graphql";
import ServerIcon from "../ServerIcon";

// the card under a message that contains an invite link
export default ({ code }: { code: string }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { data, loading } = useQuery<InviteQuery>(InviteDocument, {
    variables: { link: code },
  });
  const [join, { loading: joining }] = useMutation<JoinMutation>(JoinDocument, {
    refetchQueries: ["UserServers", "User", "Invite"],
    awaitRefetchQueries: true,
  });

  if (loading && !data) return null;

  const invite = data?.invite;

  async function accept() {
    if (!invite) return;

    setError("");
    try {
      if (!invite.joined) await join({ variables: { link: invite.link } });
      router.push(`/@me/${invite.serverId}/${invite.channelId}`);
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  return (
    <div className="mt-2 p-4 rounded-lg bg-mid max-w-[432px] w-full font-normal">
      <p className="text-xs uppercase font-bold text-gray-400 mb-3">
        {invite
          ? "You've been invited to join a server"
          : "You received an invite, but..."}
      </p>
      {invite ? (
        <div className="flex items-center gap-4">
          <ServerIcon name={invite.name} icon={invite.icon} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{invite.name}</p>
            <p className="text-xs text-gray-400">
              {invite.memberCount}{" "}
              {invite.memberCount === 1 ? "Member" : "Members"}
            </p>
          </div>
          <button
            onClick={accept}
            disabled={joining}
            className="px-4 py-2 rounded text-sm text-white bg-[#248046] hover:bg-[#1a6334] transition-all disabled:opacity-50"
          >
            {invite.joined ? "Joined" : "Join"}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-darkish" />
          <p className="text-[#f23f42] font-semibold">Invalid Invite</p>
        </div>
      )}
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
};
