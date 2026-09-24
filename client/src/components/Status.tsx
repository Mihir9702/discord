import React from "react";
import { useMutation } from "@apollo/client";
import { UpdateStatusMutation, UpdateStatusDocument } from "src/graphql";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  setStatus: DispatchBool;
}

const options = [
  { status: "online", label: "Online", color: "text-online" },
  { status: "idle", label: "Idle", color: "text-idle" },
  {
    status: "dnd",
    label: "Do Not Disturb",
    color: "text-dnd",
    desc: "You will not receive desktop notifications",
  },
  {
    status: "offline",
    label: "Invisible",
    color: "text-offline",
    desc: "You will not appear online, but will have full access to Discord",
  },
];

// * not modal - just a pop up menu
export default ({ setStatus }: Props) => {
  // the mutation returns the user, apollo updates it everywhere
  const [update] = useMutation<UpdateStatusMutation>(UpdateStatusDocument);

  async function choose(status: string) {
    setStatus(false);
    try {
      await update({ variables: { status } });
    } catch (ex) {
      console.error(ex);
    }
  }

  return (
    <>
      {/* click anywhere else to close */}
      <div className="fixed inset-0 z-20" onClick={() => setStatus(false)} />
      <section className="absolute bottom-0 left-2 z-30 mb-14 w-56 bg-[#111214] rounded-md p-2 shadow-lg shadow-darkish">
        <ul className="flex flex-col items-start gap-1 text-gray-200 font-normal">
          {options.map((o) => (
            <li
              key={o.status}
              onClick={() => choose(o.status)}
              className="hover:bg-lightblue cursor-pointer w-full p-1.5 rounded group"
            >
              <p className="text-sm">
                <span className={o.color}>●</span> {o.label}
              </p>
              {o.desc && (
                <p className="text-xs text-gray-400 group-hover:text-gray-100 ml-4">
                  {o.desc}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
