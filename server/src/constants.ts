export const __prod__ = process.env.NODE_ENV === "production";

export const COOKIE = "dyx";

export const PORT = Number(process.env.PORT) || 3000;

// origins allowed to talk to the api (comma separated in .env)
export const CLIENT_URLS = (process.env.CLIENT_URL || "http://localhost:3001")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

export const runApp = () =>
  console.log(`🚀 Server started on http://localhost:${PORT}`);
