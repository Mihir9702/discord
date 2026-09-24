import { useEffect, useState } from "react";
import { ChevronRight, PlusCircle } from "../Icons";
import { useMutation } from "@apollo/client";
import { SendMessageMutation, SendMessageDocument } from "src/graphql";

interface ChatInput {
  channelId: string;
  placeholder: string; // "#channel" or "@friend"
  disabled?: boolean;
}

const MAX = 2000;

export default ({ channelId, placeholder, disabled }: ChatInput) => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [send, { loading }] = useMutation<SendMessageMutation>(
    SendMessageDocument,
    { refetchQueries: ["Messages"] }
  );

  // drafts don't follow you to other channels
  useEffect(() => {
    setMsg("");
    setError("");
  }, [channelId]);

  function isWhiteSpace(msg: string) {
    return !msg.replace(/\s/g, "").length;
  }

  const sendMessage = async () => {
    if (isWhiteSpace(msg) || loading || disabled) return;

    setError("");
    try {
      await send({ variables: { params: { msg, channelId } } });
      setMsg("");
    } catch (ex: any) {
      setError(ex.message);
    }
  };

  const left = MAX - msg.length;

  return (
    <div>
      {error && <p className="text-sm text-red-400 mb-1 mx-1">{error}</p>}
      <section className="flex items-center min-h-[44px] rounded-lg bg-[#383a40] w-full px-4 py-2.5">
        <button
          disabled
          title="Uploads are coming soon"
          className="flex items-center justify-center text-gray-400 cursor-not-allowed"
        >
          {PlusCircle}
        </button>
        <textarea
          id="msg"
          rows={Math.min(8, msg.split("\n").length)}
          maxLength={MAX}
          disabled={disabled}
          placeholder={
            disabled
              ? "You can't send messages to this user"
              : `Message ${placeholder}`
          }
          className="flex-1 mx-3 resize-none text-gray-200 font-light bg-transparent focus:outline-none placeholder:text-gray-500 placeholder:whitespace-nowrap overflow-x-hidden leading-6"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        {left <= 200 && (
          <span className="text-xs text-gray-400 mr-2">{left}</span>
        )}
        <button
          className="text-2xl text-gray-400 hover:text-gray-200 disabled:opacity-40"
          disabled={isWhiteSpace(msg) || loading || disabled}
          onClick={sendMessage}
        >
          {ChevronRight}
        </button>
      </section>
    </div>
  );
};
