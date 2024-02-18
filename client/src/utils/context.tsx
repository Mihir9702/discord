import { createContext } from "react";

export const ServerContext = createContext({
  s: {
    name: "",
    link: "",
  },
  currCC: {
    name: "",
    channelId: "",
  },
  uf: {
    friends: [
      {
        nameId: "",
        userId: 0e4,
        iconId: "",
      },
    ],
  },
});
