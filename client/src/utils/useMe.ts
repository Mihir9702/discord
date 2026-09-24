import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserDocument, UserQuery } from "src/graphql";

type Tag = { nameId: string; userId: number };

// the signed in user (cached by apollo, so it's cheap to call anywhere)
export function useMe() {
  const { data, loading, refetch } = useQuery<UserQuery>(UserDocument);
  return { me: data?.user, loading, refetch };
}

// same as useMe but sends signed out users to the login page
export function useRequireMe() {
  const router = useRouter();
  const { me, loading, refetch } = useMe();

  useEffect(() => {
    if (!loading && !me) {
      router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
    }
  }, [loading, me]);

  return { me, loading, refetch };
}

export function sameUser(a?: Tag | null, b?: Tag | null) {
  return !!a && !!b && a.nameId === b.nameId && a.userId === b.userId;
}

// the role the signed in user has in a server
export function useRole(serverId: number) {
  const { me } = useMe();
  const role = me?.roles?.find((r) => r.serverId === serverId)?.role;
  return {
    role,
    owner: role === "owner",
    manage: role === "owner" || role === "admin",
  };
}

// only allow redirects within this site (no open redirects via ?next=).
// browsers treat "\" like "/" and drop tabs / newlines, so "/\evil.com" or
// "/<tab>/evil.com" would become "//evil.com" - reject those outright, then
// make sure the url still resolves to our own origin
export function safeNext(next: unknown, fallback = "/@me") {
  if (typeof next !== "string" || !next.startsWith("/")) return fallback;
  if (/[\\\s\u0000-\u001f\u007f]/.test(next)) return fallback;

  try {
    const base = "http://localhost";
    const url = new URL(next, base);
    if (url.origin !== base) return fallback;
    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}
