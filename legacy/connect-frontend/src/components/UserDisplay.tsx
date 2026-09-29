import { useState } from "react";
import { Settings as SettingsIcon } from "./Icons";
import { UserQuery } from "src/graphql";
import Loader from "./Loader";
import { statusColor } from "src/utils/statusColor";
import Settings from "./Settings";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  id: UserQuery["user"];
  status: boolean;
  setStatus: DispatchBool;
}

const UserDisplay = ({
  id,
  status: statusModal,
  setStatus: setStatusModal,
}: Props) => {
  const [init, setInit] = useState(false);

  if (!id) return <Loader />;

  const ifs =
    statusColor(id.status) +
    " absolute bottom-0 right-0.5 w-3 h-3 rounded-full";

  return (
    <main
      className={`
      ${!statusModal ? "bg-[#232428]" : "bg-highlight"}
      max-h-[52px] w-full rounded-sm
    `}
    >
      <section className="flex-1 text-left h-full text-gray-300 flex gap-4 p-1 items-center justify-between w-full">
        <button
          onClick={() => setStatusModal(!statusModal)} // todo status modal
          className="status-button flex items-center"
        >
          <div className="relative inline-block">
            <div
              // todo image here
              className={`w-8 h-8 rounded-full self-center`}
              style={{ backgroundColor: id.iconId }}
            />
            <span className={ifs} />
          </div>
          <div className="flex flex-col items-start leading-3">
            <p className="text-sm text-gray-300 font-bold font-sans">
              {id.nameId}
            </p>
            <p className="text-sm text-gray-300 font-light font-sans">
              {id.status}
            </p>
          </div>
        </button>
        <h1 className="text-md text-white flex justify-end items-center w-max">
          {init && <Settings init={init} iinit={setInit} />}
          <button
            onClick={() => setInit(!init)}
            className="text-md text-gray-100 hover:text-gray-400 cursor-pointer mx-2"
          >
            {SettingsIcon}
          </button>
        </h1>
      </section>
    </main>
  );
};

export default UserDisplay;
