import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const web = "http://localhost:3001";
const api = "http://localhost:4300/graphql";
const shotDir = resolve(process.cwd(), "visual-review");
mkdirSync(shotDir, { recursive: true });

type Account = { id: number; nameId: string; userId: number; cookie: string };
let alice: Account;
let bob: Account;
let serverId: number;
let channelId: string;

async function gql(query: string, variables: Record<string, unknown> = {}, cookie = "") {
  const result = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify({query, variables}),
  });
  const json: any = await result.json();
  if (!result.ok || json.errors?.length) {
    throw new Error("GraphQL fixture creation failed: " + JSON.stringify(json.errors || json));
  }
  return {data:json.data, cookie:result.headers.get("set-cookie")?.split(";")[0] || ""};
}

async function signUp(): Promise<Account> {
  const user = "v" + randomBytes(7).toString("hex");
  const result = await gql(
    "mutation($p:Input!){signup(params:$p){id nameId userId}}",
    {p:{username:user,password:"Synthetic$Password1"}},
  );
  expect(result.cookie).toContain("dyx=");
  return {...result.data.signup, cookie:result.cookie};
}

async function authorizedContext(browser: any, viewport: {width:number,height:number}) {
  const context: BrowserContext = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    colorScheme: "dark",
  });
  const match = /^dyx=([^;]+)/.exec(alice.cookie);
  expect(match).not.toBeNull();
  await context.addCookies([{
    name: "dyx", value: match![1],
    domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax",
  }]);
  return context;
}

async function screenshot(page: Page, file: string) {
  await page.screenshot({
    path: resolve(shotDir, file),
    animations: "disabled",
    fullPage: true,
  });
  const data = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    bodyBackground: getComputedStyle(document.body).backgroundColor,
  }));
  console.log(file, JSON.stringify(data));
  expect(data.horizontalOverflow).toBeLessThanOrEqual(3);
  expect(data.bodyBackground).not.toBe("rgba(0, 0, 0, 0)");
}

test.describe.configure({mode:"serial"});
test.setTimeout(60_000);
test.beforeAll(async () => {
  alice = await signUp();
  bob = await signUp();
  const created = await gql(
    "mutation{createServer(name:\"Visual Review Guild\"){serverId channels{channelId}}}",
    {}, alice.cookie,
  );
  serverId = created.data.createServer.serverId;
  channelId = created.data.createServer.channels[0].channelId;
  await gql(
    "mutation($name:String!,$serverId:Float!){createServerChannel(name:$name,serverId:$serverId){channelId}}",
    {name:"release-updates",serverId}, alice.cookie,
  );
  await gql(
    "mutation($link:String!){join(link:$link){id}}",
    {link:(await gql("query($s:Float!){server(serverId:$s){link}}",{s:serverId},alice.cookie)).data.server.link},
    bob.cookie,
  );
  await gql(
    "mutation($params:FriendInput!){sendFriendRequest(params:$params){id}}",
    {params:{nameId:bob.nameId,userId:bob.userId}}, alice.cookie,
  );
  await gql(
    "mutation($params:FriendInput!){acceptFriendRequest(params:$params){id}}",
    {params:{nameId:alice.nameId,userId:alice.userId}}, bob.cookie,
  );
  for (const msg of [
    "Welcome to our synthetic visual review.",
    "Channel permissions, profiles, and responsive navigation need to remain readable.",
    "Longer message: Testing the layout at desktop, tablet and mobile dimensions without real user data.",
  ]) {
    await gql(
      "mutation($params:MessageInput!){sendMessage(params:$params){id}}",
      {params:{channelId, msg}},alice.cookie,
    );
  }
});

test("desktop visual review: server channel, friends, and settings", async ({browser}) => {
  const context = await authorizedContext(browser,{width:1440,height:900});
  try {
    const page=await context.newPage();
    const browserErrors: string[] = [];
    page.on("pageerror",(error)=>browserErrors.push(error.message));
    await page.goto(web + "/@me/" + serverId + "/" + channelId);
    await expect(page.locator("textarea#msg")).toBeVisible();
    await expect(page.getByText("Welcome to our synthetic visual review.")).toBeVisible();
    await screenshot(page,"desktop-server.png");
    await page.getByRole("button",{name:"User Settings"}).click();
    await expect(page.getByText("My Account",{exact:true}).last()).toBeVisible();
    await page.waitForTimeout(450); // allow Framer Motion to settle before screenshot
    const settingsDebug = await page.evaluate(() => {
      const close = document.querySelector('[aria-label="Close settings"]');
      const panel = document.querySelector(".max-w-2xl");
      return {
        heading: panel?.textContent?.slice(0,200) || "not found",
        closeExists: !!close,
        closeBounds: close?.getBoundingClientRect().toJSON(),
        modalCount: document.querySelectorAll(".fixed.inset-0").length,
      };
    });
    console.log("desktop settings DOM diagnostics", JSON.stringify(settingsDebug));
    await screenshot(page,"desktop-settings.png");
    await page.getByRole("button",{name:"Close settings"}).click({timeout:5000});
    console.log("desktop settings closed");
    await page.goto(web + "/@me", {waitUntil:"domcontentloaded",timeout:7000});
    console.log("desktop home navigated");
    await screenshot(page,"desktop-friends.png");
    expect(browserErrors).toEqual([]);
  } finally {await context.close();}
});

test("tablet visual review: server and settings", async ({browser}) => {
  const context = await authorizedContext(browser,{width:768,height:1024});
  try {
    const page=await context.newPage();
    await page.goto(web + "/@me/" + serverId + "/" + channelId);
    await expect(page.locator("textarea#msg")).toBeVisible();
    await screenshot(page,"tablet-server.png");
    await page.getByRole("button",{name:"User Settings"}).click();
    await expect(page.getByRole("button",{name:"Close settings"})).toBeVisible();
    await page.waitForTimeout(350);
    await screenshot(page,"tablet-settings.png");
  } finally {await context.close();}
});

test("phone visual review: chat, navigation drawer and settings", async ({browser}) => {
  const context = await authorizedContext(browser,{width:390,height:844});
  try {
    const page=await context.newPage();
    await page.goto(web + "/@me/" + serverId + "/" + channelId);
    await expect(page.locator("textarea#msg")).toBeVisible();
    await expect(page.getByRole("button",{name:"Channels"})).toBeVisible();
    await screenshot(page,"phone-chat.png");
    await page.getByRole("button",{name:"Channels"}).click();
    await expect(page.locator("#mobile-conversations")).toHaveClass(/mobile-expanded/);
    await expect(page.getByRole("button",{name:"User Settings"})).toBeVisible();
    await screenshot(page,"phone-drawer.png");
    await page.getByRole("button",{name:"User Settings"}).click();
    const close = page.getByRole("button",{name:"Close settings"});
    await expect(close).toBeVisible();
    const closeBounds = await close.boundingBox();
    expect(closeBounds).not.toBeNull();
    expect(closeBounds!.x + closeBounds!.width).toBeLessThanOrEqual(390);
    await page.waitForTimeout(350);
    await screenshot(page,"phone-settings.png");
    await page.getByRole("button",{name:"Profiles",exact:true}).click();
    await screenshot(page,"phone-profile.png");
  } finally {await context.close();}
});
