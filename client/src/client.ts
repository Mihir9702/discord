import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// lists from the api always replace whatever is cached
const replace = { merge: false };

export default new ApolloClient({
  link: new HttpLink({ uri: `${API_URL}/graphql`, credentials: "include" }),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          friends: replace,
          friendRequests: replace,
          blocked: replace,
          roles: replace,
          servers: replace,
        },
      },
      Server: {
        fields: { users: replace, channels: replace, banned: replace },
      },
      Channel: { fields: { users: replace, messages: replace } },
    },
  }),
  defaultOptions: {
    // show what's cached right away but always refresh it, so a channel you
    // come back to isn't stuck with the messages it had when you left
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  },
});
