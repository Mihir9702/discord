import React, { useEffect, useState } from "react";
import { User } from "src/types/query";
import { statusColor } from "src/utils/statusColor";
import Tooltip from "../Tooltip";
import { User as UserIcon } from "../Icons";

interface HeaderProps {
  id: User;
}

export default ({ id }: HeaderProps) => {
  const { status, nameId, iconId } = id;

  if (!status || !nameId) return null;

  const [statusColorCss, setStatusColorCss] = useState(statusColor(status));

  useEffect(() => {
    setStatusColorCss(statusColor(status));
  }, [status]);

  return (
    <section className="flex justify-between items-center">
      <button className="flex gap-2 items-center p-[6.5px] mx-3">
        <div className="relative inline-block">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: iconId }}
          />
          <span
            className={
              "w-2.5 h-2.5 rounded-full absolute bottom-0 right-0.5" +
              statusColorCss
            }
          />
        </div>
        <Tooltip content={`${nameId}#${id.userId}`}>
          <p className="text-md font-semibold text-gray-200">{nameId}</p>
        </Tooltip>
      </button>

      <button
        className="mx-4 text-gray-300 hover:text-gray-400 hover:transition-all"
        onClick={() => {}}
      >
        {UserIcon}
      </button>
    </section>
  );
};
