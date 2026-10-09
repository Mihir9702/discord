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

Requires Node 24+, npm and PostgreSQL.

1. Clone the repository:

   ```bash
   git clone https://github.com/Mihir9702/discord.git
   ```

2. Create an empty development database (versioned migrations create tables on startup):

   ```bash
   createdb connect
   ```

3. Install dependencies for the server and set up its `.env`:

   ```bash
   cd discord/server
   npm ci
   cp .env.example .env # defaults: postgres:postgres@localhost:5432/connect
   ```

4. Run the server (http://localhost:3000/graphql):

   ```bash
   npm run dev
   ```

5. Open a new terminal window, navigate to the client directory, and install dependencies:

   ```bash
   cd ../client
   npm ci
   ```

6. Run the client:

   ```bash
   npm run dev
   ```

7. Access Discord at `http://localhost:3001`.

8. Regenerate the GraphQL schema and client operation types offline (no API required):

   ```bash
   cd discord
   npm run schema
   npm ci --prefix controller
   npm run gen --prefix controller
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

In production, sessions expire after seven days and use HTTPS-only cookies, login throttling is enabled, GraphQL introspection is disabled, passwords require strong complexity, and debug queries are disabled.

## Scripts

| | server | client |
| --- | --- | --- |
| `npm run dev` | api with auto reload | next dev on :3001 |
| `npm run build` | compile to `dist/` | production build |
| `npm start` | run `dist/` | serve the build on :3001 |
| `npm run typecheck` | `tsc --noEmit` | `tsc --noEmit` |

## Verification and safe database upgrades

Run npm ci in server/, client/ and controller/. At the project root run:

    npm run check

This generates the schema and typed GraphQL operations, typechecks, runs unit tests and builds both applications. Database-backed tests run in GitHub Actions against an isolated PostgreSQL database called connect_discord_test_ci. Local E2E tests require TEST_GRAPHQL_URL and TEST_DATABASE_URL pointing to a dedicated connect_discord_test_* database. Never point tests at real user data.

The API disables automatic TypeORM synchronization and applies additive versioned migrations. Before upgrading an existing installation, BACK UP the database, compare its schema to the migration, and rehearse the upgrade on a restored copy. The baseline creates missing objects; it does not repair every historical schema mismatch. Production schema upgrades remain subject to a separate approval.

### Feature scope

Text channels, direct messages, invitations, moderation, profiles and real-time presence are implemented. Voice/video, file attachments, private channels, notifications and unread counters are not implemented; the Active Now panel is informational. The controller is a code-generation tool, not a separate deployed service.

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
