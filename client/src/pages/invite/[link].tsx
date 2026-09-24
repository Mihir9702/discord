import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import {
  InviteDocument,
  InviteQuery,
  JoinDocument,
  JoinMutation,
} from "src/graphql";
import Loader from "src/components/Loader";
import ServerIcon from "src/components/ServerIcon";
import { useMe } from "src/utils/useMe";

// /invite/[link] - where invite links land
export default () => {
  const router = useRouter();
  const link = router.query.link as string | undefined;
  const [error, setError] = useState("");

  const { me, loading: meLoading } = useMe();
  const { data, loading } = useQuery<InviteQuery>(InviteDocument, {
    variables: { link },
    skip: !link,
  });
  const [join, { loading: joining }] = useMutation<JoinMutation>(JoinDocument, {
    refetchQueries: ["UserServers", "User"],
    awaitRefetchQueries: true,
  });

  const invite = data?.invite;
  const serverUrl = invite && `/@me/${invite.serverId}/${invite.channelId}`;

  async function accept() {
    if (!invite) return;
    if (!me) {
      router.push(`/login?next=${encodeURIComponent(router.asPath)}`);
      return;
    }
    if (invite.joined) {
      router.push(serverUrl!);
      return;
    }

    setError("");
    try {
      await join({ variables: { link: invite.link } });
      router.push(serverUrl!);
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  if (!link || loading || meLoading) return <Loader />;

  return (
    <main className="flex justify-center items-center w-full h-screen bg-image">
      <motion.div
        initial={{ translateY: -100, opacity: 0.5 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-background text-gray-300 flex flex-col items-center gap-3 p-8 rounded shadow shadow-darkish w-[480px] max-w-[95vw] text-center font-normal"
      >
        {invite ? (
          <>
            <ServerIcon name={invite.name} icon={invite.icon} size="lg" />
            <p className="text-md text-gray-400">
              {invite.joined
                ? "You're already a member of"
                : "You've been invited to join"}
            </p>
            <h1 className="text-2xl font-bold text-white">{invite.name}</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-offline" />
              {invite.memberCount}{" "}
              {invite.memberCount === 1 ? "Member" : "Members"}
            </p>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              onClick={accept}
              disabled={joining}
              className="mt-4 w-full py-2.5 rounded bg-lightblue hover:bg-darkblue text-white transition-all disabled:opacity-50"
            >
              {!me
                ? "Log in to Accept"
                : invite.joined
                ? "Go to Server"
                : "Accept Invite"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-white">Invite Invalid</h1>
            <p className="text-md text-gray-400">
              This invite may be expired, or you might not have permission to
              join.
            </p>
            <Link
              href={me ? "/@me" : "/login"}
              className="mt-4 w-full py-2.5 rounded bg-lightblue hover:bg-darkblue text-white transition-all"
            >
              {me ? "Continue to Discord" : "Log in"}
            </Link>
          </>
        )}
      </motion.div>
    </main>
  );
};
