import React from "react";
import InvitePeople from "./InvitePeople";
import ServerSettings from "./ServerSettings";
import CreateChannel from "./CreateChannel";
import LeaveServer from "./LeaveServer";
import DeleteServer from "./DeleteServer";

export interface ServerMenuOptProps {
  onClose: () => void;
  menuOpt: string;
}

export interface ServerMenuOptFC {
  onClose: () => void;
}

export {
  InvitePeople,
  ServerSettings,
  CreateChannel,
  LeaveServer,
  DeleteServer,
};

export default ({ onClose, menuOpt }: ServerMenuOptProps) => {
  switch (menuOpt) {
    case "Invite People":
      return <InvitePeople onClose={onClose} />;
    case "Server Settings":
      return <ServerSettings onClose={onClose} />;
    case "Create Channel":
      return <CreateChannel onClose={onClose} />;
    case "Leave Server":
      return <LeaveServer onClose={onClose} />;
    case "Delete Server":
      return <DeleteServer onClose={onClose} />;
    default:
      return <></>;
  }
};
