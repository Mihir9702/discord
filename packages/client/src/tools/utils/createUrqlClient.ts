import { createClient } from "urql";

export const client = createClient({
  url: "http://localhost:3000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  // * Exchanges / Caching soonTM
});
