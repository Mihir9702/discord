// Per account + IP backoff in addition to the GraphQL endpoint-wide rate limit.
// Redis-backed shared limits should replace this map if the API runs multiple replicas.
type Window = { failures: number; until: number };
const attempts = new Map<string, Window>();
const WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 8;

function key(username: string, ip: string) {
  return JSON.stringify([username, ip]);
}

export function assertLoginAllowed(username: string, ip: string, now = Date.now()) {
  const entry = attempts.get(key(username, ip));
  if (entry && now < entry.until && entry.failures >= MAX_FAILURES) {
    throw new Error("Too many login attempts. Try again later.");
  }
}

export function failedLogin(username: string, ip: string, now = Date.now()) {
  const k = key(username, ip);
  const entry = attempts.get(k);
  attempts.set(k, !entry || entry.until <= now
    ? { failures: 1, until: now + WINDOW_MS }
    : { ...entry, failures: entry.failures + 1 });
  // Avoid unbounded memory consumption under username spraying.
  if (attempts.size > 10_000) {
    for (const [id, value] of attempts) {
      if (value.until <= now) attempts.delete(id);
    }
  }
}

export function successfulLogin(username: string, ip: string) {
  attempts.delete(key(username, ip));
}
