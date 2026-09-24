import React from "react";
import { Message as Msg } from "src/types/query";
import Message from "./Message";
import {
  uniqueDates,
  getMessagesFromSameDate,
  isContinuation,
} from "src/utils/formatDate";
import { useMe } from "src/utils/useMe";

interface Props {
  msgs: Msg[];
  manage?: boolean; // can delete anyone's messages (server owner / admin)
}

export default ({ msgs, manage }: Props) => {
  const { me } = useMe();
  const unique = uniqueDates(msgs);
  const messages = unique.map((date: string) => {
    return getMessagesFromSameDate(msgs, date);
  });

  return (
    <div className="w-full">
      {messages.map((msgs: Msg[]) => {
        const date = new Date(Number(msgs[0].createdAt)).toLocaleDateString(
          "en-US",
          { month: "long", day: "numeric", year: "numeric" }
        );
        return (
          <div key={date}>
            <div className="text-gray-400 text-xs font-sans font-semibold flex justify-center items-center mt-6 mb-2 mx-4">
              <hr className="border-t w-full mx-1 border-dash" />
              <p className="whitespace-nowrap px-1">{date}</p>
              <hr className="border-t w-full mx-1 border-dash" />
            </div>
            {msgs.map((msg: Msg, i: number) => (
              <Message
                key={msg.msgId}
                msg={msg}
                compact={isContinuation(msgs[i - 1], msg)}
                mine={!!me && msg.user?.id === me.id}
                manage={manage}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
