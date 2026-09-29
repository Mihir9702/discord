import React from "react";
import { statusColor } from "src/utils/statusColor";

export default ({ status, iconId }: { status: string; iconId: string }) => {
  const ifs =
    statusColor(status) + " absolute bottom-0 right-0.5 w-3 h-3 rounded-full";

  return (
    <div className="relative inline-block">
      <div
        // todo image here
        className={`w-8 h-8 rounded-full self-center`}
        style={{ backgroundColor: iconId }}
      />
      <span className={ifs} />
    </div>
  );
};
