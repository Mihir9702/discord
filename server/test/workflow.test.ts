import assert from "node:assert/strict";
import { test } from "node:test";
import { randomBytes } from "node:crypto";
import { io } from "socket.io-client";

const graphqlUrl = process.env.TEST_GRAPHQL_URL || "";
const databaseUrl = process.env.TEST_DATABASE_URL || "";
// Never run these mutations against the developer's actual Connect/ADIYA databases.
const safeTestDatabase = /\/connect_discord_test_[a-z0-9_]+(?:\?|$)/i.test(databaseUrl);
const enabled = !!graphqlUrl && safeTestDatabase;

type Account = { cookie: string; nameId?: string; userId?: number; id?: number };
const fresh = () => "ci_" + randomBytes(7).toString("hex");

async function graphql(account: Account, query: string, variables: Record<string, unknown> = {}, errorExpected = false) {
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(account.cookie ? { Cookie: account.cookie } : {}) },
    body: JSON.stringify({ query, variables }),
  });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) account.cookie = setCookie.split(";")[0];
  assert.equal(response.status, 200, "GraphQL request should return HTTP 200");
  const json: any = await response.json();
  if (errorExpected) {
    assert.ok(json.errors?.length, JSON.stringify(json));
  } else {
    assert.equal(json.errors, undefined, JSON.stringify(json.errors));
  }
  return json.data;
}

async function signup(username: string): Promise<Account> {
  const account: Account = { cookie: "" };
  const data = await graphql(account,
    "mutation($params: Input!){ signup(params:$params) { id nameId userId } }",
    { params: { username, password: "Secure$Password1" } });
  Object.assign(account, data.signup);
  assert.ok(account.cookie.startsWith("dyx="), "Signup must set session cookie");
  return account;
}
function tag(account: Account) {
  return { nameId: account.nameId!, userId: account.userId! };
}
async function join(account: Account, link: string) {
  return graphql(account, "mutation($link:String!){join(link:$link){id}}", { link });
}
async function partyChat(account: Account, other: Account) {
  const data = await graphql(account, "query{partyChats{channelId users{id}}}");
  const dm = data.partyChats.find((c: any) => c.users.some((u: any) => u.id === other.id));
  assert.ok(dm, "Expected DM between friends");
  return dm.channelId as string;
}
async function send(account: Account, channelId: string, msg: string, errorExpected = false) {
  return graphql(account,
    "mutation($params:MessageInput!){sendMessage(params:$params){id msg msgId}}",
    { params: {channelId,msg} }, errorExpected);
}
async function messages(account: Account, channelId: string, beforeId?: number) {
  const d = await graphql(account,
    "query($channelId:String!,$beforeId:Int){messages(channelId:$channelId,beforeId:$beforeId){hasMore nextCursor messages{id msg msgId user{id}}}}",
    {channelId,beforeId});
  return d.messages as {hasMore:boolean;nextCursor:number|null;messages:Array<{id:number;msg:string;msgId:string}>};
}

test("23-step Connect workflow: accounts, friends, DMs, servers, moderation, permissions, pagination, WebSocket", { skip: !enabled && "Requires isolated TEST_DATABASE_URL and TEST_GRAPHQL_URL" }, async (t) => {
  const alice = await signup(fresh());
  const bob = await signup(fresh());
  const charlie = await signup(fresh());

  await t.test("friend requests in both directions; acceptance creates a single shared DM", async () => {
    await graphql(alice,"mutation($p:FriendInput!){sendFriendRequest(params:$p){id}}",{p:tag(bob)});
    const pending = await graphql(bob,"query{userFriends{friendRequests{nameId userId status}}}");
    assert.ok(pending.userFriends.friendRequests.some((r:any)=>r.userId===alice.userId&&r.status==="incoming"));
    await graphql(bob,"mutation($p:FriendInput!){acceptFriendRequest(params:$p){id}}",{p:tag(alice)});
    const aDm = await partyChat(alice,bob);
    const bDm = await partyChat(bob,alice);
    assert.equal(aDm,bDm);
    const all = await graphql(alice,"query{partyChats{channelId}}");
    assert.equal(all.partyChats.filter((c:any)=>c.channelId===aDm).length,1);
  });

  const dm = await partyChat(alice,bob);
  await t.test("message delivery, replies, edit ownership, and unauthorized access", async () => {
    const first = (await send(alice,dm,"Hello Bob")).sendMessage;
    assert.ok((await messages(bob,dm)).messages.some(m=>m.msg==="Hello Bob"));
    const reply = (await send(bob,dm,"Hello Alice")).sendMessage;
    assert.ok((await messages(alice,dm)).messages.some(m=>m.msg==="Hello Alice"));
    await graphql(bob,"mutation($msgId:String!,$content:String!){updateMessage(msgId:$msgId,content:$content){msg}}",
      {msgId:first.msgId,content:"tampered"},true);
    const changed = await graphql(alice,"mutation($msgId:String!,$content:String!){updateMessage(msgId:$msgId,content:$content){msg edited}}",
      {msgId:first.msgId,content:"Edited hello Bob"});
    assert.equal(changed.updateMessage.edited,true);
    await graphql(charlie,"query($id:String!){messages(channelId:$id){messages{id}}}",{id:dm},true);
    await graphql(charlie,"query($id:String!){message(msgId:$id){msg}}",{id:reply.msgId},true);
  });

  const s1 = (await graphql(alice,"mutation{createServer(name:\"Test Server A\"){serverId link channels{channelId}}}")).createServer;
  const s2 = (await graphql(alice,"mutation{createServer(name:\"Test Server B\"){serverId link channels{channelId}}}")).createServer;
  await t.test("invite links, server joins, members and protected server details", async () => {
    await send(alice,dm,"Join us: http://localhost:3001/invite/"+s1.link);
    await join(bob,s1.link);
    await join(bob,s2.link);
    await join(charlie,s2.link);
    const a = await graphql(alice,"query($id:Float!){server(serverId:$id){members{user{id}}}}",{id:s1.serverId});
    const b = await graphql(alice,"query($id:Float!){server(serverId:$id){members{user{id}}}}",{id:s2.serverId});
    assert.equal(a.server.members.length,2);
    assert.equal(b.server.members.length,3);
    await graphql(charlie,"query($id:Float!){server(serverId:$id){members{user{id}}}}",{id:s1.serverId},true);
    const nested = await graphql(alice,"query($id:Float!){server(serverId:$id){members{user{id username friends{id} blocked{id} roles{role}}}}}",{id:s1.serverId});
    const foreign = nested.server.members.find((m:any)=>m.user.id===bob.id).user;
    assert.equal(foreign.username,null);
    assert.equal(foreign.friends,null);
    assert.equal(foreign.roles,null);
  });

  await t.test("channel lifecycle, permissions, and role-based moderation", async () => {
    const channel = (await graphql(alice,"mutation($id:Float!){createServerChannel(serverId:$id,name:\"Some Test Channel\"){channelId name}}",{id:s2.serverId})).createServerChannel;
    assert.equal(channel.name,"some-test-channel");
    await graphql(bob,"mutation($id:Float!){createServerChannel(serverId:$id,name:\"Unauthorized\"){name}}",{id:s2.serverId},true);
    const updated = await graphql(alice,"mutation($id:String!){updateChannel(channelId:$id,name:\"Renamed Channel\",desc:\"Topic\"){name desc}}",{id:channel.channelId});
    assert.equal(updated.updateChannel.name,"renamed-channel");
    await send(charlie,channel.channelId,"Message from Charlie");
    await graphql(alice,"mutation($id:Float!,$p:FriendInput!){updateRole(serverId:$id,params:$p,role:\"admin\")}",{id:s2.serverId,p:tag(bob)});
    await graphql(bob,"mutation($id:Float!,$p:FriendInput!){kick(serverId:$id,params:$p)}",{id:s2.serverId,p:tag(charlie)});
    await join(charlie,s2.link);
    await graphql(bob,"mutation($id:Float!,$p:FriendInput!){ban(serverId:$id,params:$p)}",{id:s2.serverId,p:tag(charlie)});
    const moderatorBans=await graphql(bob,"query($id:Float!){server(serverId:$id){banned{userId}}}",{id:s2.serverId});
    assert.ok(moderatorBans.server.banned.some((b:any)=>b.userId===charlie.userId));
    await join(charlie,s2.link).then(()=>assert.fail("Banned user joined"),()=>undefined);
    await graphql(bob,"mutation($id:Float!,$p:FriendInput!){unban(serverId:$id,params:$p)}",{id:s2.serverId,p:tag(charlie)});
    await join(charlie,s2.link);
    const link = (await graphql(alice,"mutation($id:Float!){refreshLink(serverId:$id){link}}",{id:s2.serverId})).refreshLink.link;
    assert.notEqual(link,s2.link);
    await graphql(alice,"query($link:String!){invite(link:$link){serverId}}",{link:s2.link}).then((d)=>assert.equal(d.invite,null));
  });

  await t.test("bounded message pagination returns newest fifty then older messages", async () => {
    const channel=s1.channels[0].channelId;
    for(let i=0;i<55;i++) await send(alice,channel,"Paged message "+i);
    const latest=await messages(bob,channel);
    assert.equal(latest.messages.length,50);
    assert.equal(latest.hasMore,true);
    assert.ok(latest.nextCursor);
    const older=await messages(bob,channel,latest.nextCursor!);
    assert.ok(older.messages.length>=5);
    assert.equal(older.hasMore,false);
    assert.ok(older.messages.every(m=>m.id<latest.nextCursor!));
  });

  await t.test("authenticated sockets receive updates and reject foreign origins", async () => {
    const host = new URL(graphqlUrl).origin;
    const denied = io(host, { transports: ["websocket"], reconnection: false,
      extraHeaders: { Cookie: alice.cookie, Origin: "http://malicious.example" } });
    try {
      const refused: any = await Promise.race([
        new Promise(resolve => denied.once("connect_error", resolve)),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Foreign WebSocket origin was not rejected")), 4000)),
      ]);
      assert.ok(refused);
    } finally { denied.disconnect(); }

    const socket = io(host, { transports: ["websocket"], reconnection: false,
      extraHeaders: { Cookie: alice.cookie, Origin: "http://localhost:3001" } });
    try {
      await Promise.race([
        new Promise(resolve => socket.once("connect", () => resolve(undefined))),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Socket did not connect")), 4000)),
      ]);
      const notification: Promise<any> = new Promise(resolve => socket.once("message", resolve));
      await send(bob, dm, "Socket event from Bob");
      const received = await Promise.race([
        notification,
        new Promise((_, reject) => setTimeout(() => reject(new Error("No message event")), 4000)),
      ]) as any;
      assert.equal(received.channelId, dm);
    } finally { socket.disconnect(); }
  });

  await t.test("blocking prevents further DMs; unblock and password reset work", async () => {
    await graphql(bob,"mutation($p:FriendInput!){block(params:$p){id}}",{p:tag(alice)});
    await send(alice,dm,"Blocked message",true);
    await graphql(bob,"mutation($p:FriendInput!){unblock(params:$p){id}}",{p:tag(alice)});
    await send(alice,dm,"Unblocked message");
    await graphql(alice,"mutation($p:UpdatePassInput!){updatePass(params:$p){id}}",
      {p:{currPass:"Secure$Password1",newPass:"New$SecurePassword2"}});
    await graphql(alice,"mutation{logout}",{});
    assert.equal(alice.cookie.startsWith("dyx="),true);
    const invalid=await graphql({cookie:""},"mutation($p:Input!){login(params:$p){id}}",
      {p:{username:"bad_login_for_ci",password:"bad"}},true);
    assert.equal(invalid,null);
  });
});
