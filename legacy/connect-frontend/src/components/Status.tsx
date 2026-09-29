import React from "react";
import { useMutation } from "@apollo/client";
import { UpdateStatusMutation, UpdateStatusDocument } from "src/graphql";
import { DispatchBool } from "src/types/dispatch";

interface Props {
  setStatus: DispatchBool;
  refetch: () => void;
}

// * not modal - just a pop up menu

export default ({ setStatus, refetch }: Props) => {
  const [update] = useMutation<UpdateStatusMutation>(UpdateStatusDocument);

  return (
    <section className="absolute bottom-0 mb-12 w-full bg-[#232428] rounded-sm">
      <ul className="flex flex-col items-start gap-2 text-gray-200 font-normal">
        <li
          onClick={async () => {
            await update({ variables: { status: "online" } });
            setStatus(false);
            refetch();
          }}
          className="hover:bg-highlight cursor-pointer w-full p-1"
        >
          <p>
            <span className="text-online">●</span> Online
          </p>
        </li>
        <li
          onClick={async () => {
            await update({ variables: { status: "idle" } });
            setStatus(false);
            refetch();
          }}
          className="hover:bg-highlight cursor-pointer w-full p-1"
        >
          <p>
            <span className="text-idle">●</span> Idle
          </p>
        </li>
        <li
          onClick={async () => {
            await update({ variables: { status: "dnd" } });
            setStatus(false);
            refetch();
          }}
          className="hover:bg-highlight cursor-pointer w-full p-1"
        >
          <p>
            <span className="text-dnd">●</span> Do Not Disturb
          </p>
        </li>
        <li
          onClick={async () => {
            await update({ variables: { status: "offline" } });
            setStatus(false);
            refetch();
          }}
          className="hover:bg-highlight cursor-pointer w-full p-1"
        >
          <p>
            <span className="text-offline">●</span> Offline
          </p>
        </li>
      </ul>
    </section>
  );
};
