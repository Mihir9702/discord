import { User } from "../entities/User";
import { CheckArgs, CheckReturn } from "../types";

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function check({ user, friend, server, channel, message }: CheckArgs) {
  const result: CheckReturn = {} as CheckReturn;

  if (user) {
    const { id, nameId, userId } = user;
    if (!id || !nameId || !userId) throw new Error("check - no user");
    result.u = user;
  }

  if (friend) {
    const { id, nameId, userId } = friend;
    if (!id || !nameId || !userId) throw new Error("check - no friend");
    result.f = friend;
  }

  if (server) {
    const { id, serverId } = server;
    if (!id || !serverId) throw new Error("check - no server");
    result.s = server;
  }

  if (channel) {
    const { id, channelId } = channel;
    if (!id || !channelId) throw new Error("check - no channel");
    result.c = channel;
  }

  if (message) {
    const { id, msgId } = message;
    if (!id || !msgId) throw new Error("check - no message");
    result.m = message;
  }

  return result;
}

export function checkCopy(arr: any[] | undefined, id: User): any[] {
  if (!arr) return [];
  return arr.map((a) => {
    if (a.nameId === id.nameId || a.userId === id.userId) {
      throw new Error("checkCopy - duplicate");
    }
  });
}

export function filter(arr: any[], u: any): any[] {
  return arr.filter((a) => !(a.nameId === u.nameId && a.userId === u.userId));
}

export function find(arr: any[], id: number): any {
  return arr.find((a) => a.id === id) || null;
}

export function role(arr: any[], id: number): any {
  return arr.find((a) => a.serverId === id);
}

export function push(arr: any[] | undefined, id: any): any[] | any {
  if (!arr) {
    return (arr = [{ ...id }]);
  } else {
    return arr ? [...arr, { ...id }] : [{ ...id }];
  }
}
