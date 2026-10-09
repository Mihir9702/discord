# Discord

A Discord clone built using the PERN stack. Add friends, chat in direct messages, and create servers with text channels, invite links, roles and moderation. Messages, friend requests and online status update live over WebSockets.

> **Independent project.** This is an educational clone and is not affiliated with, endorsed by, or sponsored by Discord Inc. The app uses its own "Connect" mark and does not include Discord's logo or bundled brand artwork.

## Features

- Accounts - signup / login, display name + `Name#0000` tags, avatar colors, change password, delete account
- Friends - send / accept / ignore / cancel requests, remove, block / unblock
- Direct messages with every friend
- Servers - create, join with an invite link (or from an invite sent in a dm), text channels, leave / delete
- Server settings - rename, icon, regenerate invite link, members with admin / kick / ban, ban list
- Messages - markdown style `code` and ```code blocks```, links, edit + delete, invite embeds
- Live updates over websockets - messages, friend requests, server changes and online status (offline when you close the app, "Invisible" to appear offline)

## Stack

- `server` - Express, Apollo Server, TypeGraphQL, TypeORM, PostgreSQL, socket.io
- `client` - Next.js, Apollo Client, Tailwind, Framer Motion, socket.io-client
- `controller` - the GraphQL queries / mutations the client uses + codegen for the client's typed hooks

## Installation

Requires Node 20+, npm and PostgreSQL.

1. Clone the repository:

   ```bash
   git clone https://github.com/Mihir9702/discord.git
   ```

2. Create the database (tables are created automatically on first run):

   ```bash
   createdb connect
   ```

3. Install dependencies for the server and set up its `.env`:

   ```bash
   cd discord/server
   npm install
   cp .env.example .env # defaults: postgres:postgres@localhost:5432/connect
   ```

4. Run the server (http://localhost:3000/graphql):

   ```bash
   npm run dev
   ```

5. Open a new terminal window, navigate to the client directory, and install dependencies:

   ```bash
   cd ../client
   npm install
   ```

6. Run the client:

   ```bash
   npm run dev
   ```

7. Access Discord at `http://localhost:3001`.

8. (Optional) To regenerate TypeScript types after changing the GraphQL schema or anything in `controller/src/graphql`, run this with the server running:

   ```bash
   cd discord/controller
   npm install
   npm run gen
   ```

## Configuration

Server (`server/.env`, see `.env.example`):

| Variable | Default | |
| --- | --- | --- |
| `DATABASE_URL` | - | full postgres connection string, overrides the `POSTGRES_*` values |
| `POSTGRES_HOST` / `POSTGRES_PORT` | `localhost` / `5432` | |
| `POSTGRES_USER` / `POSTGRES_PASS` | `postgres` / `postgres` | |
| `POSTGRES_DB` | `connect` | |
| `PORT` | `3000` | |
| `CLIENT_URL` | `http://localhost:3001` | allowed origin(s) for cors + websockets, comma separated |
| `SESSION_SECRET` | dev only default | required when `NODE_ENV=production` |
| `COOKIE_SAMESITE` | `lax` | `none` when the client and api are on different sites (https only) |

Client: `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`).

In production (`NODE_ENV=production`) cookies are https only, passwords need 8+ characters with upper, lower and special characters, and the `users` / `servers` debugging queries are disabled.

## Scripts

| | server | client |
| --- | --- | --- |
| `npm run dev` | api with auto reload | next dev on :3001 |
| `npm run build` | compile to `dist/` | production build |
| `npm start` | run `dist/` | serve the build on :3001 |
| `npm run typecheck` | `tsc --noEmit` | `tsc --noEmit` |

## Project history

This project began as **Connect** across separate repositories. Their original commits are joined with Discord's history, preserving their original commit IDs, authors, and dates.

| Earlier repository | Preserved Git history |
| --- | --- |
| `connect-frontend` | [4 original commits](https://github.com/Mihir9702/discord/commits/1b5b157cdbedb307ee729f011d366693be26130e) |
| `connect-backend` | [2 original commits](https://github.com/Mihir9702/discord/commits/07f034c1ee0570c9a59bb689005331be63fb310f) |
| `connect-graphql-controller` | [2 original commits](https://github.com/Mihir9702/discord/commits/6f285590a3d2abcf2e30bc9eef6543d6e8a21721) |

The current application is in `client/`, `server/`, and `controller/`. Earlier implementations are available through Git history.

```bash
git log --all --graph --oneline
```

## License

This is an independent open-source educational project released under the MIT License; see [LICENSE](LICENSE). Third-party components retain their own licenses and notices in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Discord and associated marks are trademarks of their respective owners. This app is not affiliated with Discord Inc.
