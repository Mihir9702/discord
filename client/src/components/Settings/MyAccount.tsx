import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DeleteUserDocument,
  DeleteUserMutation,
  UpdatePassDocument,
  UpdatePassMutation,
  UpdateUserDocument,
  UpdateUserMutation,
} from "src/graphql";
import { User } from "src/types/query";
import UserIcon from "../UserIcon";
import FormModal, { Field } from "./FormModal";

interface Props {
  me: User;
  editProfile: () => void;
}

type Editing = "nameId" | "username" | "password" | "delete" | null;

export default ({ me, editProfile }: Props) => {
  const { nameId, iconId, status, userId } = me;
  const username = me.username || ""; // only ever null for other users
  const [editing, setEditing] = useState<Editing>(null);

  const [updateUser] = useMutation<UpdateUserMutation>(UpdateUserDocument);
  const [updatePass] = useMutation<UpdatePassMutation>(UpdatePassDocument);
  const [deleteUser] = useMutation<DeleteUserMutation>(DeleteUserDocument);

  const button =
    "bg-lightblue hover:bg-darkblue text-white transition-all shadow-sm shadow-black p-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm";
  const grey =
    "bg-[#4e5058] hover:bg-[#6d6f78] text-white transition-all p-1.5 px-4 rounded text-sm";

  const row = (label: string, value: string, edit: Editing) => (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xs uppercase font-bold text-gray-400">{label}</h2>
        <p className="text-gray-200">{value}</p>
      </div>
      <button onClick={() => setEditing(edit)} className={grey}>
        Edit
      </button>
    </div>
  );

  const modals: Record<
    Exclude<Editing, null>,
    {
      title: string;
      description?: string;
      fields: Field[];
      submit: string;
      danger?: boolean;
      onSubmit: (v: Record<string, string>) => Promise<unknown>;
    }
  > = {
    nameId: {
      title: "Change your display name",
      description: "This is how others see you. You'll get a new #tag too.",
      fields: [{ name: "nameId", label: "Display Name", value: nameId }],
      submit: "Done",
      onSubmit: (v) =>
        updateUser({ variables: { params: { nameId: v.nameId } } }),
    },
    username: {
      title: "Change your username",
      description: "This is what you log in with.",
      fields: [
        {
          name: "username",
          label: "Username",
          value: username,
          autoComplete: "username",
        },
      ],
      submit: "Done",
      onSubmit: (v) =>
        updateUser({ variables: { params: { username: v.username } } }),
    },
    password: {
      title: "Update your password",
      description: "Enter your current password and a new password.",
      fields: [
        {
          name: "currPass",
          label: "Current Password",
          type: "password",
          autoComplete: "current-password",
        },
        {
          name: "newPass",
          label: "New Password",
          type: "password",
          autoComplete: "new-password",
        },
        {
          name: "confirm",
          label: "Confirm New Password",
          type: "password",
          autoComplete: "new-password",
        },
      ],
      submit: "Done",
      onSubmit: async (v) => {
        if (v.newPass !== v.confirm) throw new Error("Passwords do not match!");
        await updatePass({
          variables: { params: { currPass: v.currPass, newPass: v.newPass } },
        });
      },
    },
    delete: {
      title: "Delete Account",
      description:
        "Are you sure? This deletes your messages, direct messages and every server you own. It can't be undone.",
      fields: [
        {
          name: "password",
          label: "Password",
          type: "password",
          autoComplete: "current-password",
        },
      ],
      submit: "Delete Account",
      danger: true,
      onSubmit: async (v) => {
        await deleteUser({ variables: { password: v.password } });
        window.location.assign("/signup");
      },
    },
  };

  return (
    <div className="flex flex-col gap-8 font-normal">
      <h1 className="text-xl font-semibold text-white">My Account</h1>

      <article className="bg-darkish rounded-lg overflow-hidden">
        <div className="h-24" style={{ backgroundColor: iconId }} />
        <div className="flex justify-between items-end px-4 -mt-8">
          <div className="flex items-end gap-4">
            <div className="rounded-full border-[6px] border-darkish">
              <UserIcon
                iconId={iconId}
                status={status}
                name={nameId}
                size="lg"
              />
            </div>
            <h1 className="text-xl font-semibold text-white mb-3">
              {nameId}
              <span className="text-gray-400">#{userId}</span>
            </h1>
          </div>
          <button onClick={editProfile} className={button + " mb-3"}>
            Edit User Profile
          </button>
        </div>

        <div className="m-4 p-4 bg-mid rounded-lg flex flex-col gap-6">
          {row("Display Name", nameId, "nameId")}
          {row("Username", username, "username")}
        </div>
      </article>

      <hr className="border-[1px] w-full border-dash" />

      <article className="flex flex-col items-start gap-4">
        <h1 className="text-lg font-semibold text-white">
          Password and Authentication
        </h1>
        <button onClick={() => setEditing("password")} className={button}>
          Change Password
        </button>
      </article>

      <hr className="border-[1px] w-full border-dash" />

      <article className="flex flex-col justify-between items-start gap-2">
        <h1 className="text-xs uppercase font-bold text-gray-400">
          Account Removal
        </h1>
        <p className="text-gray-400 text-sm">
          Disabling your account means you can recover it at any time after
          taking this action.
        </p>
        <div className="flex gap-4 mt-2">
          <button
            disabled
            title="Coming soon"
            className="bg-red-500 text-white shadow-sm shadow-black p-2 px-3 rounded text-sm opacity-50 cursor-not-allowed"
          >
            Disable Account
          </button>

          <button
            onClick={() => setEditing("delete")}
            className="border border-red-500 hover:bg-red-500 text-white transition-all shadow-sm shadow-black
                   p-2 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
          >
            Delete Account
          </button>
        </div>
      </article>

      {editing && (
        <FormModal {...modals[editing]} onClose={() => setEditing(null)} />
      )}
    </div>
  );
};
