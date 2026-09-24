import { createContext } from "react";
import { Server } from "src/types/query";

// the server being viewed + what the signed in user can do in it
export const ServerContext = createContext<{
  s?: Server;
  channelId?: string;
  manage: boolean; // owner or admin
  owner: boolean;
}>({ manage: false, owner: false });
