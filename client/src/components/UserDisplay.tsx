import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Settings as SettingsIcon } from "./Icons";
import Settings from "./Settings";
import Status from "./Status";
import UserIcon from "./UserIcon";
import Tooltip from "./Tooltip";
import { DispatchBool } from "src/types/dispatch";
import { useMe } from "src/utils/useMe";

interface Props {
  status: boolean;
  setStatus: DispatchBool;
}

// the signed in user's panel at the bottom of the middle column
const UserDisplay = ({
  status: statusModal,
  setStatus: setStatusModal,
}: Props) => {
  const [init, setInit] = useState(false);
  const { me } = useMe();

  if (!me) return null;

  return (
    <main
      className={`
      ${!statusModal ? "bg-[#232428]" : "bg-highlight"}
      max-h-[52px] w-full rounded-sm
    `}
    >
      {statusModal && <Status setStatus={setStatusModal} />}

      <section className="flex-1 text-left h-full text-gray-300 flex gap-2 p-1 items-center justify-between w-full">
        <button
          onClick={() => setStatusModal(!statusModal)}
          className="status-button flex items-center min-w-0"
          title="Set status"
        >
          <UserIcon iconId={me.iconId} status={me.status} name={me.nameId} />
          <div className="flex flex-col items-start leading-4 min-w-0">
            <p className="text-sm text-gray-200 font-bold font-sans truncate max-w-[110px]">
              {me.nameId}
            </p>
            <p className="text-xs text-gray-400 font-light font-sans">
              #{me.userId}
            </p>
          </div>
        </button>
        <Tooltip content="User Settings" position="top">
          <button
            aria-label="User Settings"
            onClick={() => setInit(true)}
            className="text-md text-gray-100 hover:text-gray-400 cursor-pointer mx-2"
          >
            {SettingsIcon}
          </button>
        </Tooltip>
      </section>

      <AnimatePresence>
        {init && <Settings onClose={() => setInit(false)} />}
      </AnimatePresence>
    </main>
  );
};

export default UserDisplay;
