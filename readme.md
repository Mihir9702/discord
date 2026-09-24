# Discord

Discord is an instant messaging social platform that replicates the communication experience of voice calls, video calls, text messaging, and media/file sharing built using the PERN stack.

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

Requires Node 18+, Yarn and PostgreSQL.

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
   yarn install
   cp .env.example .env # defaults: postgres:postgres@localhost:5432/connect
   ```

4. Run the server (http://localhost:3000/graphql):

   ```bash
   yarn dev
   ```

5. Open a new terminal window, navigate to the client directory, and install dependencies:

   ```bash
   cd ../client
   yarn install
   ```

6. Run the client:

   ```bash
   yarn dev
   ```

7. Access Discord at `http://localhost:3001`.

8. (Optional) To regenerate TypeScript types after changing the GraphQL schema or anything in `controller/src/graphql`, run this with the server running:

   ```bash
   cd discord/controller
   yarn install
   yarn gen
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

Client: `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`).

In production (`NODE_ENV=production`) cookies are https only, passwords need 8+ characters with upper, lower and special characters, and the `users` / `servers` debugging queries are disabled.

## Scripts

| | server | client |
| --- | --- | --- |
| `yarn dev` | api with auto reload | next dev on :3001 |
| `yarn build` | compile to `dist/` | production build |
| `yarn start` | run `dist/` | serve the build on :3001 |
| `yarn typecheck` | `tsc --noEmit` | `tsc --noEmit` |
