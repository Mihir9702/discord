import React from "react";
import Home from "./Home";
import Servers from "./Servers";

const ServerNavigation: React.FC = () => {
  return (
    <nav className="server-nav lg:text-sm lg:leading-6 p-4 relative">
      <Home />
      <Servers />
    </nav>
  );
};

export default ServerNavigation;
