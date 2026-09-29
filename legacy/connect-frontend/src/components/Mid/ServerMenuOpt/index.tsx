import React from "react";
import InvitePeople from "./InvitePeople";
import ServerSettings from "./ServerSettings";
import CreateChannel from "./CreateChannel";
import { DispatchBool } from "src/types/dispatch";

export interface ServerMenuOptProps {
  onClose: () => void;
  menuOpt: string;
  refetch: DispatchBool;
}

export interface ServerMenuOptFC {
  onClose: () => void;
}

export { InvitePeople, ServerSettings, CreateChannel };

export default ({ onClose, menuOpt, refetch }: ServerMenuOptProps) => {
  switch (menuOpt) {
    case "Invite People":
      return <InvitePeople onClose={onClose} />;
    case "Server Settings":
      return <ServerSettings onClose={onClose} />;
    case "Create Channel":
      return <CreateChannel onClose={onClose} refetch={refetch} />;
    default:
      return <></>;
  }
};
