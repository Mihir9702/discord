import { useState, useContext } from "react";
import Modal from "src/components/Modal";
import { ServerMenuOptFC } from ".";
import { ServerContext } from "src/utils/context";
import { useMutation, useQuery } from "@apollo/client";
import {
  PartyChatsDocument,
  PartyChatsQuery,
  SendMessageDocument,
  SendMessageMutation,
  UserFriendsDocument,
  UserFriendsQuery,
} from "src/graphql";
import UserIcon from "src/components/UserIcon";

export function inviteUrl(link: string) {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/invite/${link}`;
}

export async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // older browsers / http - fall back to a hidden textarea
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }
}

export default ({ onClose }: ServerMenuOptFC) => {
  const [invSearch, setInvSearch] = useState("");
  const [invites, setInvites] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const { s, channelId } = useContext(ServerContext);

  const { data: uf } = useQuery<UserFriendsQuery>(UserFriendsDocument);
  const { data: dms } = useQuery<PartyChatsQuery>(PartyChatsDocument);
  const [msg] = useMutation<SendMessageMutation>(SendMessageDocument);

  if (!s) return null;

  const url = inviteUrl(s.link);
  const currCC = s.channels?.find((c) => c.channelId === channelId);
  const members = (s.users || []).map((u) => u.id);

  const inviteMsg = `Hey there! I'm inviting you to join ${s.name}!\n\nJoin here: ${url}\n\nSee you there!`;

  const friends = (uf?.userFriends?.friends || [])
    .filter((f) =>
      `${f.nameId}#${f.userId}`
        .toLowerCase()
        .includes(invSearch.trim().toLowerCase())
    )
    .sort((a, b) => a.nameId.localeCompare(b.nameId));

  async function invite(id: number) {
    // invites go out as a message in your dm with them
    const dm = dms?.partyChats.find((c) => c.users?.some((u) => u.id === id));
    if (!dm) return;

    setError("");
    try {
      await msg({
        variables: { params: { channelId: dm.channelId, msg: inviteMsg } },
      });
      setInvites([...invites, id]);
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  return (
    <Modal handleClose={onClose} dark>
      <main className="flex flex-col items-start bg-background gap-2 p-4 w-[440px] max-w-[95vw] text-gray-200 text-md font-light rounded-md">
        <section className="flex flex-col items-start gap-2 my-2 w-full">
          <h1 className="text-lg">
            Invite friends to{" "}
            <strong className="font-semibold">{s.name}</strong>
          </h1>
          {currCC && (
            <h1 className="text-sm text-gray-400">
              # {` `}
              <strong className="font-semibold">{currCC.name}</strong>
            </h1>
          )}
          <input
            type="text"
            value={invSearch}
            autoFocus
            placeholder="Search for friends"
            onChange={({ target }) => {
              setInvSearch(target.value);
            }}
            className={
              "bg-[#1e1f22] text-gray-300 placeholder:text-md placeholder:font-light w-full p-1.5 focus:outline-none rounded"
            }
          />
        </section>
        <section className="flex flex-col overflow-auto items-start w-full gap-1 h-[200px] border-y border-darkish py-2">
          {friends.length === 0 && (
            <p className="text-sm text-gray-400 m-auto">
              {invSearch ? "No friends found" : "Add some friends first!"}
            </p>
          )}
          {friends.map((f) => {
            const member = members.includes(f.id);
            const sent = invites.includes(f.id);
            return (
              <main
                key={f.id}
                className="flex items-center justify-between w-full p-1.5 rounded hover:bg-highlight"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <UserIcon iconId={f.iconId} name={f.nameId} />
                  <p className="text-md font-sans truncate">{f.nameId}</p>
                </div>
                <button
                  onClick={() => invite(f.id)}
                  disabled={member || sent}
                  className="px-3 py-1 text-sm rounded border border-online hover:bg-online transition-all disabled:border-transparent disabled:bg-transparent disabled:text-gray-400"
                >
                  {member ? "Member" : sent ? "Sent" : "Invite"}
                </button>
              </main>
            );
          })}
        </section>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <section className="flex flex-col items-start w-full gap-2">
          <h1 className="uppercase text-xs font-semibold text-gray-400">
            OR, send a server invite link to a friend
          </h1>
          <h1 className="w-full flex justify-between items-center gap-2 bg-darkish rounded p-1 pl-2">
            <span className="truncate text-sm">{url}</span>
            <button
              onClick={async () => {
                await copy(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className={`px-4 py-1.5 rounded text-sm text-white transition-all ${
                copied ? "bg-online" : "bg-lightblue hover:bg-darkblue"
              }`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </h1>
        </section>
      </main>
    </Modal>
  );
};
