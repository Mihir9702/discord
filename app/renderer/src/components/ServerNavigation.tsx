import React from "react";
import AddNavigation from "./AddNavigation";
import HomeNavigation from "./HomeNavigation";
import Servers from "./Servers";

const ServerNavigation: React.FC = () => {
  return (
    <nav className="server-nav lg:text-sm lg:leading-6 p-5 relative">
      <HomeNavigation />
      <hr className="border-gray-800 mt-3" />
      <Servers />
      <hr className="border-gray-800 mb-3" />
      <AddNavigation />
    </nav>
  );
};

export default ServerNavigation;
