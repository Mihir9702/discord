import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  DeleteMessageDocument,
  DeleteMessageMutation,
  UpdateMessageDocument,
  UpdateMessageMutation,
} from "src/graphql";
import { Message } from "src/types/query";
import { formatDate, formatTime } from "src/utils/formatDate";
import { formatMessage, inviteCodes } from "src/utils/formatMessage";
import UserIcon from "../UserIcon";
import Confirm from "../Confirm";
import InviteEmbed from "./InviteEmbed";
import { Pencil, Trash } from "../Icons";

interface Props {
  msg: Message;
  compact?: boolean; // same author as the message above - skip the header
  mine?: boolean;
  manage?: boolean;
}

export default ({ msg, compact, mine, manage }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(msg.msg);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [update] = useMutation<UpdateMessageMutation>(UpdateMessageDocument);
  const [remove] = useMutation<DeleteMessageMutation>(DeleteMessageDocument, {
    refetchQueries: ["Messages"],
  });

  const invites = useMemo(() => inviteCodes(msg.msg), [msg.msg]);

  async function save() {
    const text = draft.trim();

    if (!text) return setDeleting(true);
    if (text === msg.msg) return setEditing(false);

    try {
      await update({ variables: { msgId: msg.msgId, content: text } });
      setEditing(false);
      setError("");
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  const user = msg.user;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`group relative flex gap-4 px-4 py-0.5 hover:bg-[#2e3035] ${
        compact ? "" : "mt-4"
      }`}
    >
      {compact ? (
        <span className="w-10 shrink-0 pt-1 text-[10px] text-gray-500 text-right opacity-0 group-hover:opacity-100 select-none">
          {formatTime(msg.createdAt)}
        </span>
      ) : (
        <UserIcon iconId={user?.iconId} name={user?.nameId} size="md" />
      )}

      <section className="flex-col w-full min-w-0">
        {!compact && (
          <div className="flex items-baseline gap-2">
            <h1 className="text-md text-gray-100 font-medium">
              {user?.nameId}
            </h1>
            <p className="text-xs text-gray-400 font-light">
              {formatDate(msg.createdAt)}
            </p>
          </div>
        )}

        {editing ? (
          <div className="my-1">
            <textarea
              autoFocus
              value={draft}
              maxLength={2000}
              rows={Math.min(8, draft.split("\n").length)}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  save();
                } else if (e.key === "Escape") {
                  setEditing(false);
                }
              }}
              className="w-full bg-[#383a40] rounded-lg p-2.5 text-gray-200 font-light resize-none focus:outline-none"
            />
            <p className="text-xs text-gray-400 font-normal">
              escape to{" "}
              <button
                onClick={() => setEditing(false)}
                className="text-[#00a8fc] hover:underline"
              >
                cancel
              </button>{" "}
              • enter to{" "}
              <button onClick={save} className="text-[#00a8fc] hover:underline">
                save
              </button>
            </p>
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        ) : (
          <div className="text-gray-300 text-md font-light">
            {formatMessage(msg.msg)}
            {msg.edited && (
              <span className="text-[10px] text-gray-500 ml-1 select-none">
                (edited)
              </span>
            )}
          </div>
        )}

        {invites.map((code) => (
          <InviteEmbed key={code} code={code} />
        ))}
      </section>

      {!editing && (mine || manage) && (
        <div className="absolute -top-3 right-4 hidden group-hover:flex bg-background border border-darkish rounded shadow z-10">
          {mine && (
            <button
              title="Edit"
              onClick={() => {
                setDraft(msg.msg);
                setEditing(true);
              }}
              className="p-1.5 text-gray-400 hover:text-gray-100"
            >
              {Pencil}
            </button>
          )}
          <button
            title="Delete"
            onClick={() => setDeleting(true)}
            className="p-1.5 text-gray-400 hover:text-red-400"
          >
            {Trash}
          </button>
        </div>
      )}

      {deleting && (
        <Confirm
          title="Delete Message"
          confirm="Delete"
          danger
          onClose={() => setDeleting(false)}
          onConfirm={() => remove({ variables: { msgId: msg.msgId } })}
        >
          Are you sure you want to delete this message?
          <div className="mt-3 p-2 rounded bg-mid text-gray-300 text-sm max-h-40 overflow-hidden">
            {formatMessage(msg.msg)}
          </div>
        </Confirm>
      )}
    </motion.div>
  );
};
