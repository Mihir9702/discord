import React from "react";
import Add from "./Add";
import Home from "./Home";
import Servers from "./Servers";

export default () => {
  return (
    <main className="servers">
      <nav className="flex flex-col items-center min-w-[72px] max-w-[72px] py-4 bg-darkish h-full">
        <Home />
        <hr className="border-1 border-[#4d4c3b] rounded-lg w-full max-w-[50px] mt-3" />
        <Servers />
        <hr className="border-1 border-[#4d4c3b] rounded-lg w-full max-w-[50px] mb-3" />
        <Add />
      </nav>
    </main>
  );
};
