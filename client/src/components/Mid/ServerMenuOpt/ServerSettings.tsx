import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import {
  BanDocument,
  BanMutation,
  KickDocument,
  KickMutation,
  RefreshLinkDocument,
  RefreshLinkMutation,
  UnbanDocument,
  UnbanMutation,
  UpdateRoleDocument,
  UpdateRoleMutation,
  UpdateServerDocument,
  UpdateServerMutation,
} from "src/graphql";
import { ServerMenuOptFC } from ".";
import { ServerContext } from "src/utils/context";
import { Server } from "src/types/query";
import { useMe } from "src/utils/useMe";
import { copy, inviteUrl } from "./InvitePeople";
import DeleteServer from "./DeleteServer";
import ServerIcon from "src/components/ServerIcon";
import UserIcon from "src/components/UserIcon";
import Confirm from "src/components/Confirm";
import { Cross, Crown } from "src/components/Icons";
import Portal from "src/components/Portal";

// a member's user fields + their role in this server
type Member = Server["members"][number]["user"] & { role: string };

// sections that work - everything else in the sidebar is "coming soon"
const pages = ["Overview", "Invites", "Members", "Bans", "Delete Server"];

const sidebar = {
  title: "text-sm uppercase mx-4 mb-1 text-gray-400",
  item: "w-full text-start p-4 py-2 text-md rounded text-gray-200",
  divider: "border-1 border-dash mx-4 my-1",
};

const heading = "text-xl font-semibold text-white mb-6";
const label = "text-xs uppercase font-bold text-gray-400";
const input =
  "mt-2 w-full bg-darkish text-gray-200 rounded p-2.5 focus:outline-none font-normal";
const button =
  "px-4 py-2 rounded text-sm text-white bg-lightblue hover:bg-darkblue transition-all disabled:opacity-50";

function Overview({ s }: { s: Server }) {
  const [name, setName] = useState(s.name);
  const [icon, setIcon] = useState(s.icon || "");
  const [status, setStatus] = useState("");
  const [update, { loading }] = useMutation<UpdateServerMutation>(
    UpdateServerDocument,
    { refetchQueries: ["Server", "UserServers"] }
  );

  const changed = name !== s.name || icon !== (s.icon || "");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    try {
      await update({ variables: { serverId: s.serverId, name, icon } });
      setStatus("Saved!");
    } catch (ex: any) {
      setStatus(ex.message);
    }
  }

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <h1 className={heading}>Server Overview</h1>
      <div className="flex gap-8 items-start">
        <ServerIcon name={name || s.name} icon={icon} size="lg" />
        <div className="flex-1 flex flex-col gap-6">
          <label className={label}>
            Server Name
            <input
              value={name}
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
              className={input}
            />
          </label>
          <label className={label}>
            Server Icon (image url)
            <input
              value={icon}
              placeholder="https://i.imgur.com/icon.png"
              onChange={(e) => setIcon(e.target.value)}
              className={input}
            />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" disabled={!changed || loading} className={button}>
          Save Changes
        </button>
        {status && (
          <p
            className={`text-sm ${
              status === "Saved!" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </form>
  );
}

function Invites({ s }: { s: Server }) {
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [refresh] = useMutation<RefreshLinkMutation>(RefreshLinkDocument, {
    refetchQueries: ["Server", "UserServers"],
    awaitRefetchQueries: true,
  });

  const url = inviteUrl(s.link);

  return (
    <div className="flex flex-col gap-4">
      <h1 className={heading}>Invites</h1>
      <p className="text-gray-400 font-normal">
        Anyone with this link can join <strong>{s.name}</strong>. Generate a new
        one to stop the current link from working.
      </p>
      <div className="flex items-center gap-2 bg-darkish rounded p-1 pl-3">
        <span className="flex-1 truncate font-normal">{url}</span>
        <button
          onClick={async () => {
            await copy(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className={`${button} ${copied ? "!bg-online" : ""}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div>
        <button
          onClick={() => setConfirm(true)}
          className="px-4 py-2 rounded text-sm text-white bg-[#4e5058] hover:bg-[#6d6f78] transition-all"
        >
          Generate a New Link
        </button>
      </div>
      {confirm && (
        <Confirm
          title="Generate a new invite link?"
          confirm="Generate"
          onClose={() => setConfirm(false)}
          onConfirm={() => refresh({ variables: { serverId: s.serverId } })}
        >
          The current link (<strong>{s.link}</strong>) will stop working.
        </Confirm>
      )}
    </div>
  );
}

function Members({ s, owner }: { s: Server; owner: boolean }) {
  const { me } = useMe();
  const [action, setAction] = useState<{
    kind: "kick" | "ban";
    m: Member;
  } | null>(null);
  const [error, setError] = useState("");

  const opts = { refetchQueries: ["Server"] };
  const [kick] = useMutation<KickMutation>(KickDocument, opts);
  const [ban] = useMutation<BanMutation>(BanDocument, opts);
  const [updateRole] = useMutation<UpdateRoleMutation>(
    UpdateRoleDocument,
    opts
  );

  const members: Member[] = s.members.map((m) => ({ ...m.user, role: m.role }));

  const roleOf = (m: Member) => m.role;
  const myRole = members.find((m) => m.id === me?.id)?.role || "member";

  // owners can moderate anyone, admins only regular members
  const canModerate = (m: Member) =>
    m.id !== me?.id &&
    roleOf(m) !== "owner" &&
    (owner || (myRole === "admin" && roleOf(m) === "member"));

  const params = (m: Member) => ({ nameId: m.nameId, userId: m.userId });

  async function toggleAdmin(m: Member) {
    setError("");
    try {
      await updateRole({
        variables: {
          serverId: s.serverId,
          params: params(m),
          role: roleOf(m) === "admin" ? "member" : "admin",
        },
      });
    } catch (ex: any) {
      setError(ex.message);
    }
  }

  return (
    <div>
      <h1 className={heading}>Server Members — {members.length}</h1>
      {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
      {members.map((m) => {
        const role = roleOf(m);
        return (
          <div
            key={m.id}
            className="group flex items-center justify-between gap-3 py-2 px-2 border-t border-dash hover:bg-highlight rounded"
          >
            <div className="flex items-center gap-3 min-w-0">
              <UserIcon iconId={m.iconId} status={m.status} name={m.nameId} />
              <p className="truncate">
                {m.nameId}
                <span className="text-gray-400">#{m.userId}</span>
              </p>
              {role === "owner" && (
                <span
                  title="Server Owner"
                  className="text-idle flex items-center gap-1 text-xs"
                >
                  {Crown} Owner
                </span>
              )}
              {role === "admin" && (
                <span className="text-xs bg-lightblue text-white rounded px-1.5">
                  Admin
                </span>
              )}
            </div>
            {canModerate(m) && (
              <div className="flex gap-2 text-sm opacity-0 group-hover:opacity-100">
                {owner && (
                  <button
                    onClick={() => toggleAdmin(m)}
                    className="px-2 py-1 rounded bg-[#4e5058] hover:bg-[#6d6f78]"
                  >
                    {role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                )}
                <button
                  onClick={() => setAction({ kind: "kick", m })}
                  className="px-2 py-1 rounded bg-[#4e5058] hover:bg-[#6d6f78]"
                >
                  Kick
                </button>
                <button
                  onClick={() => setAction({ kind: "ban", m })}
                  className="px-2 py-1 rounded bg-[#da373c] hover:bg-[#a12829]"
                >
                  Ban
                </button>
              </div>
            )}
          </div>
        );
      })}
      {action && (
        <Confirm
          title={`${action.kind === "kick" ? "Kick" : "Ban"} '${
            action.m.nameId
          }' from ${s.name}`}
          confirm={action.kind === "kick" ? "Kick" : "Ban"}
          danger
          onClose={() => setAction(null)}
          onConfirm={() => {
            const variables = {
              serverId: s.serverId,
              params: params(action.m),
            };
            return action.kind === "kick"
              ? kick({ variables })
              : ban({ variables });
          }}
        >
          {action.kind === "kick"
            ? "They will be able to rejoin again with a new invite."
            : "They won't be able to rejoin, even with an invite, until they're unbanned."}
        </Confirm>
      )}
    </div>
  );
}

function Bans({ s }: { s: Server }) {
  const [error, setError] = useState("");
  const [unban] = useMutation<UnbanMutation>(UnbanDocument, {
    refetchQueries: ["Server"],
  });

  const banned = s.banned || [];

  return (
    <div>
      <h1 className={heading}>Server Ban List — {banned.length}</h1>
      {banned.length === 0 && (
        <p className="text-gray-400 font-normal">
          No bans. Everyone's behaving!
        </p>
      )}
      {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
      {banned.map((b) => (
        <div
          key={b.id}
          className="flex items-center justify-between py-2 px-2 border-t border-dash"
        >
          <div className="flex items-center gap-3">
            <UserIcon iconId={b.iconId} name={b.nameId} />
            <p>
              {b.nameId}
              <span className="text-gray-400">#{b.userId}</span>
            </p>
          </div>
          <button
            onClick={async () => {
              setError("");
              try {
                await unban({
                  variables: {
                    serverId: s.serverId,
                    params: { nameId: b.nameId, userId: b.userId },
                  },
                });
              } catch (ex: any) {
                setError(ex.message);
              }
            }}
            className="px-3 py-1 text-sm rounded bg-[#4e5058] hover:bg-[#6d6f78]"
          >
            Revoke Ban
          </button>
        </div>
      ))}
    </div>
  );
}

export default ({ onClose }: ServerMenuOptFC) => {
  const { s, owner } = useContext(ServerContext);
  const [option, setOption] = useState("Overview");

  // esc closes settings
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!s) return null;

  const item = (name: string, danger = false) => {
    const works = pages.includes(name) && (name !== "Delete Server" || owner);
    return (
      <h2
        onClick={() => works && setOption(name)}
        title={works ? undefined : "Coming soon"}
        className={`${sidebar.item} ${
          works
            ? "cursor-pointer hover:bg-highlight"
            : "opacity-40 cursor-not-allowed"
        } ${option === name ? "bg-highlight text-white" : ""} ${
          danger && works ? "!text-[#f23f42]" : ""
        }`}
      >
        {name}
      </h2>
    );
  };

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-background"
      >
        <article className="w-full h-full font-light">
          <main className="w-full h-full flex items-start justify-between">
            <section className="bg-mid w-80 h-full flex overflow-x-hidden overflow-y-auto shrink-0">
              <hr className="sm:px-2 md:px-6 border-none" />
              <section className="w-full flex flex-col gap-2 py-8">
                <div className="w-full">
                  <h1 className={sidebar.title + " truncate"}>{s.name}</h1>
                  {item("Overview")}
                  {item("Roles")}
                  {item("Emoji")}
                  {item("Stickers")}
                  {item("Soundboard")}
                  {item("Widget")}
                  {item("Server Template")}
                  {item("Invites")}
                  <hr className={sidebar.divider} />
                </div>
                <div className="w-full">
                  <h1 className={sidebar.title}>Apps</h1>
                  {item("Integrations")}
                  {item("App Directory")}
                  <hr className={sidebar.divider} />
                </div>
                <div className="w-full">
                  <h1 className={sidebar.title}>Moderation</h1>
                  {item("Safety Setup")}
                  {item("AutoMod")}
                  {item("Audit Log")}
                  {item("Bans")}
                  <hr className={sidebar.divider} />
                </div>
                <div className="w-full">
                  <h1 className={sidebar.title}>User Management</h1>
                  {item("Members")}
                  <hr className={sidebar.divider} />
                  {item("Delete Server", true)}
                </div>
              </section>
            </section>

            <section className="py-14 px-10 flex-1 h-full overflow-y-auto text-gray-200">
              <div className="max-w-2xl">
                {option === "Overview" && <Overview s={s} />}
                {option === "Invites" && <Invites s={s} />}
                {option === "Members" && <Members s={s} owner={owner} />}
                {option === "Bans" && <Bans s={s} />}
              </div>
            </section>

            <section className="h-full pt-14 pr-10 flex flex-col items-center gap-1">
              <button
                className="w-9 h-9 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white flex items-center justify-center"
                onClick={onClose}
              >
                {Cross}
              </button>
              <p className="text-xs text-gray-400 font-semibold">ESC</p>
            </section>
          </main>
        </article>

        {option === "Delete Server" && (
          <DeleteServer onClose={() => setOption("Overview")} />
        )}
      </motion.div>
    </Portal>
  );
};
