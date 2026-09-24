import { In } from "typeorm";
import db from "../connect";
import { User } from "../entities/User";
import { Server } from "../entities/Server";
import { Channel } from "../entities/Channel";
import { ServerRole } from "../entities/ServerRole";
import { role } from "./array";
import { randomNumberGenerator } from "./random";
import { emitTo } from "../socket";

export type Role = ServerRole["role"];

// add / remove join table rows without loading (and re-saving) whole relations
export const relation = (entity: typeof User | typeof Channel, name: string) =>
  db.createQueryBuilder().relation(entity, name);

export function getRole(user: User, serverId: number): Role | undefined {
  return role(user.roles, serverId)?.role;
}

export function canManage(user: User, serverId: number): boolean {
  const r = getRole(user, serverId);
  return r === "owner" || r === "admin";
}

export async function members(serverDbId: number): Promise<User[]> {
  return await User.createQueryBuilder("u")
    .innerJoin("u.servers", "s", "s.id = :serverDbId", { serverDbId })
    .orderBy("u.id", "ASC")
    .getMany();
}

export async function memberIds(serverDbId: number): Promise<number[]> {
  return (await members(serverDbId)).map((u) => u.id);
}

export async function isMember(userId: number, serverDbId: number) {
  const count = await User.createQueryBuilder("u")
    .innerJoin("u.servers", "s", "s.id = :serverDbId", { serverDbId })
    .where("u.id = :userId", { userId })
    .getCount();
  return count > 0;
}

async function inChannel(userId: number, channelDbId: number) {
  const count = await Channel.createQueryBuilder("c")
    .innerJoin("c.users", "u", "u.id = :userId", { userId })
    .where("c.id = :channelDbId", { channelDbId })
    .getCount();
  return count > 0;
}

// dms are limited to their two users, server channels to server members
export async function canAccess(userId: number, channel: Channel) {
  if (channel.ptChat || !channel.server) return inChannel(userId, channel.id);
  return isMember(userId, channel.server.id);
}

// load a channel the user is allowed to see (server is always loaded)
export async function channelFor(
  userId: number | undefined,
  channelId: string,
  relations: string[] = []
): Promise<Channel> {
  const channel = await Channel.findOne({
    where: { channelId },
    relations: ["server", ...relations],
  });

  if (!userId || !channel || !(await canAccess(userId, channel))) {
    throw new Error("Channel not found");
  }

  return channel;
}

// who should hear about activity in a channel
export async function channelAudience(channel: Channel): Promise<number[]> {
  if (channel.server && !channel.ptChat) return memberIds(channel.server.id);

  const users = await User.createQueryBuilder("u")
    .innerJoin("u.channels", "c", "c.id = :id", { id: channel.id })
    .getMany();
  return users.map((u) => u.id);
}

export async function setRole(u: User, serverId: number, r?: Role) {
  const roles = (u.roles || []).filter((x) => x.serverId !== serverId);
  u.roles = r ? [...roles, { serverId, role: r }] : roles;
  await User.update(u.id, { roles: u.roles });
}

export async function addToServer(u: User, s: Server, as: Role = "member") {
  await relation(User, "servers").of(u.id).add(s.id);
  await setRole(u, s.serverId, as);
}

export async function removeFromServer(u: User, s: Server) {
  await relation(User, "servers").of(u.id).remove(s.id);

  // older versions also tracked server channel members
  const channels = await Channel.find({ where: { server: { id: s.id } } });
  if (channels.length) {
    await relation(User, "channels")
      .of(u.id)
      .remove(channels.map((c) => c.id));
  }

  await setRole(u, s.serverId, undefined);
}

export async function deleteServer(s: Server) {
  const users = await members(s.id);

  // roles are stored on the users
  await Promise.all(users.map((u) => setRole(u, s.serverId, undefined)));

  // channels, messages and memberships cascade
  await Server.delete(s.id);

  emitTo(
    users.map((u) => u.id),
    "server:removed",
    { serverId: s.serverId }
  );
}

// the dm between two friends - reused if they were friends before
export async function dmChannel(a: User, b: User): Promise<Channel> {
  const existing = await Channel.createQueryBuilder("c")
    .innerJoin("c.users", "a", "a.id = :a", { a: a.id })
    .innerJoin("c.users", "b", "b.id = :b", { b: b.id })
    .where("c.ptChat = true")
    .getOne();

  if (existing) return existing;

  const id = randomNumberGenerator(15).toString();
  const channel = await Channel.create({
    name: id,
    channelId: id,
    ptChat: true,
  }).save();

  await relation(User, "channels").of(a.id).add(channel.id);
  await relation(User, "channels").of(b.id).add(channel.id);

  return channel;
}

export async function deleteChannels(ids: number[]) {
  if (ids.length) await Channel.delete({ id: In(ids) });
}
