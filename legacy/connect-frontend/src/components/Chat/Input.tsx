import { useEffect, useState } from "react";
import { ChevronRight, PlusCircle } from "../Icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  SendMessageMutation,
  SendMessageDocument,
  CurrentChannelQuery,
  CurrentChannelDocument,
} from "src/graphql";
import { DispatchBool } from "src/types/dispatch";

interface ChatInput {
  channelId: string;
  isFetch: DispatchBool;
}

export default ({ channelId, isFetch }: ChatInput) => {
  const [msg, setMsg] = useState("");
  const [msgp, setMsgP] = useState("");
  const [send] = useMutation<SendMessageMutation>(SendMessageDocument);

  const { data } = useQuery<CurrentChannelQuery>(CurrentChannelDocument, {
    variables: { channelId },
  });

  const channel = data?.currentChannel;
  const ptChat = channel?.ptChat;

  useEffect(() => {
    if (ptChat) {
      channel.users?.forEach((user) => {
        if (user.nameId !== localStorage.getItem("id")) {
          setMsgP(`@${user.nameId}`);
        }
      });
    } else {
      setMsgP(`#${channel?.name as string}`);
    }
  }, [channelId, channel]);

  function isWhiteSpace(msg: string) {
    return !msg.replace(/\s/g, "").length;
  }

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (isWhiteSpace(msg)) return;

    const params = { msg, channelId };
    const { errors } = await send({ variables: { params } });
    if (errors) console.error(errors[0].message);

    setMsg("");
    isFetch(true);
  };

  console.log(msgp);
  return (
    <section className="flex items-center h-16 rounded-xl bg-white dark:bg-mid w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          {PlusCircle}
        </button>
      </div>
      <div className="flex-col w-full h-full mx-3">
        <span className="h-7 w-full" />
        <textarea
          id="msg"
          placeholder={`Message ${msgp}`}
          className="w-full h-full resize-none text-gray-200 font-light bg-transparent focus:outline-none placeholder:whitespace-nowrap overflow-x-hidden"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage(e);
            }
          }}
        />
      </div>
      <button
        className="mx-3 text-2xl text-gray-600 hover:text-gray-400 dark:text-gray-100 dark:hover:text-gray-500"
        onClick={(e) => sendMessage(e)}
      >
        {ChevronRight}
      </button>
    </section>
  );
};
