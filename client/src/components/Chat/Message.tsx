import React from "react";
import { Message } from "src/types/query";
import { motion } from "framer-motion";
import { formatDate } from "src/utils/formatDate";
import { formatMessage } from "src/utils/formatMessage";
import Link from "next/link";

// todo - new line link + img preview
// todo - same minute messages
// todo fix - message box size

export default ({ msg }: { msg: Message }) => {
  return (
    <motion.div
      key={msg.msgId}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg  flex justify-between"
    >
      <div className="flex items-start  gap-3 my-3">
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full dark:text-gray-200"
          style={{ backgroundColor: msg.user.iconId }}
        >
          {msg.user.nameId[0]}
        </div>
        <section className="flex-col w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-lg dark:text-gray-200 font-light">
              {msg.user.nameId}
            </h1>
            <p className="text-sm dark:text-gray-400 font-light">
              {formatDate(msg.createdAt)}
            </p>
          </div>
          <div className="text-gray-300 text-lg font-extralight break-words">
            {msg.msg.includes("https://") ? ( // todo - new line link + img preview
              <h1>
                <Link href={msg.msg} className="text-lightblue hover:underline">
                  {msg.msg.split(" ")[0]}
                </Link>
                <br />
                {formatMessage(msg.msg.slice(msg.msg.split(" ")[0].length))}
              </h1>
            ) : (
              <h1 className="text-gray-300">{formatMessage(msg.msg)}</h1>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
