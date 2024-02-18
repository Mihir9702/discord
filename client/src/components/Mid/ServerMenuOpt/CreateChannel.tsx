import React from "react";
import InputField from "src/components/InputField";
import Modal from "src/components/Modal";
import { useMutation } from "@apollo/client";
import {
  CreateServerChannelMutation,
  CreateServerChannelDocument,
} from "src/graphql";
import { DispatchBool } from "src/types/dispatch";
import { useRouter } from "next/router";

interface Props {
  refetch: DispatchBool;
  onClose: () => void;
}

export default ({ refetch, onClose }: Props) => {
  const id = useRouter().query.id as string;
  const [channelPrivate, makeChannelPrivate] = React.useState(false);
  const [name, setName] = React.useState("");

  const [create] = useMutation<CreateServerChannelMutation>(
    CreateServerChannelDocument
  );

  async function createChannel(e: any) {
    e.preventDefault();

    const { errors } = await create({
      variables: { name, serverId: Number(id) },
    });

    if (errors) {
      console.error(errors[0].message);
    } else {
      onClose();
      setName("");
      refetch(true);
    }
  }

  return (
    <Modal handleClose={onClose} dark>
      <section className="bg-mid shadow-lg shadow-darkish p-6 text-gray-100 flex flex-col items-start gap-4 rounded">
        <h1 className="text-3xl">Create Channel</h1>
        <h2 className="text-xl">Channel Type: Text</h2>
        <hr className="my-6" />
        <form onSubmit={createChannel}>
          <InputField
            name="name"
            placeholder="new-channel"
            label="Channel Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                createChannel(e);
              }
            }}
          />
          {/* Private channel  */}
          <div className="flex items-center w-full justify-between mt-4">
            <label htmlFor="private">Private Channel</label>
            <input
              type="radio"
              name="private"
              id="private"
              className={`
              ${channelPrivate && "bg-blue-500"}
              w-5 h-5 rounded-full border-2 border-gray-500
              `}
              // deselect radio button
              checked={channelPrivate ? true : false}
              onClick={() => makeChannelPrivate(!channelPrivate)}
            />
          </div>
          <h1 className="text-sm w-full mt-2 text-gray-500">
            Only selected members and roles will be able to view this channel.
          </h1>
          <div className="flex items-center gap-6 mt-4 justify-end">
            <button onClick={onClose} className="hover:underline">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name}
              onClick={() => createChannel}
              className={`
              px-4 py-2 transition-all rounded 
              ${name && "bg-lightblue hover:bg-darkblue"}
              ${!name && "opacity-50 cursor-not-allowed"}
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
