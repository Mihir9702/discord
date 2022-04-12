import React from "react";
import Chat from "renderer/src/components/Chat";
import ServerNavigation from "renderer/src/components/ServerNavigation";

// ! this will be scrapped for a better home ui design
export default () => {
  return (
    <div className="max-w-8xl mx-auto bg-gray-900">
      <div className="fixed z-10 inset-0 -left-10 shadow-md right-auto px-8 overflow-y-auto">
        <ServerNavigation />
        <div className="bg-gray-900 z-20 inset-0 fixed left-20 ml-2 text-center text-gray-100 right-auto w-56 p-2 shadow-md overflow-y-auto">
          <div className="hover:bg-gray-800 mt-4 rounded-md cursor-pointer">
            👨 Friends
          </div>
          <hr className="my-4 border-gray-800 mx-auto" />
          <p className="text-left uppercase text-sm relative my-4">
            Direct Messages
            <span className="absolute left-auto right-0 cursor-pointer">
              ➕
            </span>
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-12 text-center hover:bg-gray-800 p-2 rounded-md">
              <div className="bg-gray-500 p-4 rounded-full" />
              <span>Name</span>
            </div>
          </div>
        </div>
        <Chat />
      </div>
    </div>
  );
};
