import { ServerRole } from "../entities/ServerRole";
import { CheckArgs, CheckReturn } from "../types";

type Tag = { nameId: string; userId: number };

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// throws for every lookup that was passed in but came back empty
export function check(args: CheckArgs) {
  const { user, friend, server, channel, message } = args;
  const result: CheckReturn = {} as CheckReturn;

  if ("user" in args) {
    if (!user || !user.id || !user.nameId || !user.userId) {
      throw new Error("User not found");
    }
    result.u = user;
  }

  if ("friend" in args) {
    if (!friend || !friend.id || !friend.nameId || !friend.userId) {
      throw new Error("User not found");
    }
    result.f = friend;
  }

  if ("server" in args) {
    if (!server || !server.id || !server.serverId) {
      throw new Error("Server not found");
    }
    result.s = server;
  }

  if ("channel" in args) {
    if (!channel || !channel.id || !channel.channelId) {
      throw new Error("Channel not found");
    }
    result.c = channel;
  }

  if ("message" in args) {
    if (!message || !message.id || !message.msgId) {
      throw new Error("Message not found");
    }
    result.m = message;
  }

  return result;
}

// same user / friend request, compared by tag (nameId#userId)
export function same(a: Tag, b: Tag): boolean {
  return a.nameId === b.nameId && a.userId === b.userId;
}

export function filter<T extends Tag>(arr: T[] | null | undefined, u: Tag): T[] {
  return (arr || []).filter((a) => !same(a, u));
}

export function find<T extends { id: number }>(
  arr: T[] | null | undefined,
  id: number
): T | null {
  return (arr || []).find((a) => a.id === id) || null;
}

export function role(
  arr: ServerRole[] | null | undefined,
  serverId: number
): ServerRole | undefined {
  return (arr || []).find((a) => a.serverId === serverId);
}

export function push<T>(arr: T[] | null | undefined, item: T): T[] {
  return [...(arr || []), { ...item }];
}
