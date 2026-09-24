import { Server as HttpServer, IncomingMessage } from "http";
import { RequestHandler } from "express";
import { Server } from "socket.io";
import db from "./connect";
import { User } from "./entities/User";

// server -> client events. clients react by refetching the affected queries
export type SocketEvent =
  | "message" // { channelId } a message was sent / edited / deleted
  | "friends" // friend list or friend requests changed
  | "presence" // { id } someone's status changed
  | "server" // { serverId } server name, channels or members changed
  | "server:removed" // { serverId } you left, got kicked / banned, or it was deleted
  | "account"; // your own account changed (other tabs)

let io: Server | undefined;

// userId -> open sockets (a user can have multiple tabs open)
const connections = new Map<number, number>();

const room = (id: number) => `user:${id}`;

export function isOnline(id: number) {
  return (connections.get(id) || 0) > 0;
}

export function initSocket(
  http: HttpServer,
  session: RequestHandler,
  origin: string[]
) {
  io = new Server(http, { cors: { origin, credentials: true } });

  // share the express session so every socket knows its user
  io.engine.use(session as any);

  io.on("connection", (socket) => {
    const req = socket.request as IncomingMessage & {
      session?: { idx?: number };
    };
    const id = req.session?.idx;

    if (!id) {
      socket.disconnect(true);
      return;
    }

    socket.join(room(id));

    const count = (connections.get(id) || 0) + 1;
    connections.set(id, count);
    if (count === 1) notifyPresence(id);

    socket.on("disconnect", () => {
      const left = (connections.get(id) || 1) - 1;
      if (left > 0) {
        connections.set(id, left);
        return;
      }
      connections.delete(id);
      notifyPresence(id);
    });
  });
}

export function emitTo(ids: number[], event: SocketEvent, payload = {}) {
  const unique = [...new Set(ids)].filter(Boolean);
  if (!io || unique.length === 0) return;
  io.to(unique.map(room)).emit(event, payload);
}

// everyone who can see this user: friends, dm partners and server members
export async function audience(id: number): Promise<number[]> {
  const rows: { id: number }[] = await db.query(
    `SELECT "userId_2" AS id FROM user_friends_user WHERE "userId_1" = $1
     UNION
     SELECT b."userId" AS id FROM user_servers_server a
       JOIN user_servers_server b ON a."serverId" = b."serverId"
       WHERE a."userId" = $1
     UNION
     SELECT b."userId" AS id FROM user_channels_channel a
       JOIN user_channels_channel b ON a."channelId" = b."channelId"
       WHERE a."userId" = $1`,
    [id]
  );
  return rows.map((r) => r.id);
}

async function notifyPresence(id: number) {
  try {
    const user = await User.findOne({ where: { id } });
    // invisible users look offline either way
    if (!user || user.status === "offline") return;
    emitTo(await audience(id), "presence", { id });
  } catch (ex) {
    console.error("presence -", ex);
  }
}
