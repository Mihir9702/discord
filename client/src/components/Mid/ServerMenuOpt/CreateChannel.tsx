import React, { useContext } from "react";
import InputField from "src/components/InputField";
import Modal from "src/components/Modal";
import { useMutation } from "@apollo/client";
import {
  CreateServerChannelMutation,
  CreateServerChannelDocument,
} from "src/graphql";
import { useRouter } from "next/router";
import { ServerContext } from "src/utils/context";
import { channelName } from "src/utils/channelName";
import { ServerMenuOptFC } from ".";

export default ({ onClose }: ServerMenuOptFC) => {
  const router = useRouter();
  const { s } = useContext(ServerContext);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const [create] = useMutation<CreateServerChannelMutation>(
    CreateServerChannelDocument,
    { refetchQueries: ["Server", "UserServers"], awaitRefetchQueries: true }
  );

  const preview = channelName(name);

  // the form's submit handles enter too - no separate key handler
  async function createChannel(e: React.FormEvent) {
    e.preventDefault();
    if (!preview || busy || !s) return;

    setBusy(true);
    setError("");
    try {
      const { data } = await create({
        variables: { name, serverId: s.serverId },
      });
      onClose();
      router.push(`/@me/${s.serverId}/${data!.createServerChannel.channelId}`);
    } catch (ex: any) {
      setError(ex.message);
      setBusy(false);
    }
  }

  return (
    <Modal handleClose={onClose} dark>
      <section className="bg-mid shadow-lg shadow-darkish p-6 text-gray-100 flex flex-col items-start gap-4 rounded w-[460px] max-w-[95vw]">
        <h1 className="text-3xl">Create Channel</h1>
        <h2 className="text-xl">Channel Type: Text</h2>
        <form onSubmit={createChannel} className="w-full">
          <InputField
            name="name"
            placeholder="new-channel"
            label="Channel Name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && preview !== name && (
            <p className="text-xs text-gray-400 -mt-1">
              Will be created as <strong>#{preview || "…"}</strong>
            </p>
          )}
          {/* Private channel  */}
          <div className="flex items-center w-full justify-between mt-4 opacity-50">
            <label htmlFor="private">Private Channel (coming soon)</label>
            <input
              type="checkbox"
              name="private"
              id="private"
              disabled
              className="w-5 h-5 cursor-not-allowed"
            />
          </div>
          <h1 className="text-sm w-full mt-2 text-gray-500">
            Only selected members and roles will be able to view this channel.
          </h1>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          <div className="flex items-center gap-6 mt-4 justify-end">
            <button type="button" onClick={onClose} className="hover:underline">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!preview || busy}
              className={`
              px-4 py-2 transition-all rounded
              ${preview && "bg-lightblue hover:bg-darkblue"}
              ${!preview && "bg-lightblue opacity-50 cursor-not-allowed"}
              `}
            >
              Create Channel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
