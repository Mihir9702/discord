import React from "react";
import ServerNavigation from "../src/components/ServerNavigation";
import Message from "../src/components/Message";

export default () => {
  return (
    <div className="max-w-8xl mx-auto bg-gray-900">
      <div className="fixed z-10 inset-0 -left-10 shadow-md right-auto px-8 overflow-y-auto">
        <ServerNavigation />
        <div className="bg-gray-900 z-20 inset-0 fixed left-20 ml-2 text-center text-gray-100 shadow-md right-auto px-28 overflow-y-auto"></div>
        <div className="home-chat-background z-10 inset-0 fixed left-72 ml-6 text-center text-gray-100 shadow-md right-auto overflow-y-auto">
          <div className="bg-blue-900 flex flex-col z-20 inset-0 top-auto mx-auto">
            <div className="w-screen absolute left-0">
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
          </div>
          <div className="home-chat-background z-10 inset-0 left-72 ml-6 text-center text-gray-100 shadow-md right-auto overflow-y-auto">
            <div className="absolute left-0 bottom-10">
              <div className="bg-gray-900 px-1 py-1 fixed w-5/6">
                <input
                  className="w-full bg-gray-700 text-gray-100 text-sm font-medium rounded py-2 px-4 focus:outline-none focus:bg-gray-700 focus:border-gray-700"
                  type="text"
                  placeholder="Type a message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
