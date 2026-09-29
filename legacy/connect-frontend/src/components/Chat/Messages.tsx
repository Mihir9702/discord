import React from "react";
import { Message as Msg } from "src/types/query";
import Message from "./Message";
import { uniqueDates, getMessagesFromSameDate } from "src/utils/formatDate";

export default ({ msgs }: { msgs: Msg[] }) => {
  const unique = uniqueDates(msgs);
  const messages = unique.map((date: string) => {
    return getMessagesFromSameDate(msgs, date);
  });

  return (
    <div className="w-full overflow-hidden overflow-x-hidden ">
      <div className="mx-4 flex flex-col-reverse h-full overflow-y-auto overflow-hidden">
        <div className="flex flex-col w-full">
          {messages.map((msgs: Msg[], index: number) => {
            const date = new Date(Number(msgs[0].createdAt)).toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            );
            return (
              <div key={index}>
                <div className="w-full mt-1">
                  <div className="text-gray-400 text-sm font-sans font-normal flex justify-center items-center">
                    <hr className="border-[1px] w-full mx-1 border-dash" />
                    <p className="whitespace-nowrap">{date}</p>
                    <hr className="border-[1px] w-full mx-1 border-dash" />
                  </div>
                </div>
                {msgs.map((msg: Msg) => (
                  // todo same minute messages
                  <Message key={msg.msgId} msg={msg} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
