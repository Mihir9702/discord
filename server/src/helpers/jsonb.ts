import db from "../connect";

// atomic edits of the jsonb array columns (user.roles, user.friendRequests,
// server.banned). reading the array, changing it in js and saving it back
// loses updates when two requests touch the same row at the same time

type Tag = { nameId: string; userId: number };

async function update(sql: string, params: unknown[]) {
  // postgres UPDATE ... RETURNING comes back as [rows, count]
  const [rows] = await db.query(sql, params);
  return rows?.[0];
}

// the column's array minus the elements (x) matching `drop`
const without = (column: string, drop: string) =>
  `COALESCE((SELECT jsonb_agg(x) FROM jsonb_array_elements(COALESCE(${column}, '[]'::jsonb)) x WHERE NOT (${drop})), '[]'::jsonb)`;

// user.roles - replace (or remove) the role for one server
export async function saveRole(
  userId: number,
  serverId: number,
  role?: string
) {
  const row = await update(
    `UPDATE "user" SET "roles" = ${without(
      `"roles"`,
      `(x->>'serverId')::int = $2`
    )} || $3::jsonb WHERE "id" = $1 RETURNING "roles"`,
    [userId, serverId, JSON.stringify(role ? [{ serverId, role }] : [])]
  );
  return row?.roles || [];
}

// user.friendRequests - replace (or remove) the request with `other`
export async function saveRequest(
  userId: number,
  other: Tag,
  request?: object
) {
  const row = await update(
    `UPDATE "user" SET "friendRequests" = ${without(
      `"friendRequests"`,
      `x->>'nameId' = $2 AND (x->>'userId')::int = $3`
    )} || $4::jsonb WHERE "id" = $1 RETURNING "friendRequests"`,
    [
      userId,
      other.nameId,
      other.userId,
      JSON.stringify(request ? [request] : []),
    ]
  );
  return row?.friendRequests || [];
}

// user.friendRequests - someone changed their name / icon, update their copy
export async function renameInRequests(
  userId: number,
  old: Tag,
  next: Tag & { iconId: string }
) {
  await db.query(
    `UPDATE "user" SET "friendRequests" = (
       SELECT COALESCE(jsonb_agg(
         CASE WHEN x->>'nameId' = $2 AND (x->>'userId')::int = $3
         THEN x || $4::jsonb ELSE x END), '[]'::jsonb)
       FROM jsonb_array_elements(COALESCE("friendRequests", '[]'::jsonb)) x
     ) WHERE "id" = $1`,
    [
      userId,
      old.nameId,
      old.userId,
      JSON.stringify({
        nameId: next.nameId,
        userId: next.userId,
        iconId: next.iconId,
      }),
    ]
  );
}

// server.banned - add or remove a ban
export async function saveBan(
  serverDbId: number,
  userId: number,
  ban?: object
) {
  const row = await update(
    `UPDATE "server" SET "banned" = ${without(
      `"banned"`,
      `(x->>'id')::int = $2`
    )} || $3::jsonb WHERE "id" = $1 RETURNING "banned"`,
    [serverDbId, userId, JSON.stringify(ban ? [ban] : [])]
  );
  return row?.banned || [];
}
