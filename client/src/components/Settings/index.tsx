import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import {
  LogoutDocument,
  LogoutMutation,
  UserFriendsDocument,
  UserFriendsQuery,
} from "src/graphql";
import { useMe } from "src/utils/useMe";
import Options, { Option } from "./Options";
import MyAccount from "./MyAccount";
import Profiles from "./Profiles";
import Blocked from "../Home/Blocked";
import Confirm from "../Confirm";
import Portal from "../Portal";
import { Cross } from "../Icons";

interface Props {
  onClose: () => void;
}

export default ({ onClose }: Props) => {
  const { me } = useMe();
  const [option, setOption] = useState<Option>("MyAccount");
  const [logout, setLogout] = useState(false);

  const { data } = useQuery<UserFriendsQuery>(UserFriendsDocument);
  const [Logout] = useMutation<LogoutMutation>(LogoutDocument);

  // esc closes settings
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!me) return null;

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 w-full h-screen flex bg-background"
      >
        <Options
          option={option}
          setOption={setOption}
          onLogout={() => setLogout(true)}
        />

        <section className="flex-1 h-full overflow-y-auto py-14 px-10 text-gray-200">
          <div className="max-w-2xl">
            {option === "MyAccount" && (
              <MyAccount me={me} editProfile={() => setOption("Profiles")} />
            )}
            {option === "Profiles" && <Profiles me={me} />}
            {option === "Blocked" && (
              <>
                <h1 className="text-xl font-semibold text-white">
                  Blocked Users
                </h1>
                <div className="-mx-6">
                  <Blocked friends={data?.userFriends?.blocked || []} />
                </div>
              </>
            )}
          </div>
        </section>

        <section className="h-full pt-14 pr-10 flex flex-col items-center gap-1">
          <button
            className="w-9 h-9 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white flex items-center justify-center"
            onClick={onClose}
          >
            {Cross}
          </button>
          <p className="text-xs text-gray-400 font-semibold">ESC</p>
        </section>

        {logout && (
          <Confirm
            title="Log Out"
            confirm="Log Out"
            danger
            onClose={() => setLogout(false)}
            onConfirm={async () => {
              await Logout();
              window.location.assign("/login");
            }}
          >
            Are you sure you want to logout?
          </Confirm>
        )}
      </motion.div>
    </Portal>
  );
};
