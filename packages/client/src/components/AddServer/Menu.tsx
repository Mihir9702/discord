import React from "react";
import { Display } from "./index";

interface Props {
  setDisplay: React.Dispatch<React.SetStateAction<Display>>;
}

const Menu: React.FC<Props> = ({ setDisplay }) => {
  return (
    <section className="flex gap-8 mt-8">
      <div className="flex flex-col border-2 p-8 gap-y-8 ">
        <p>Create a server?</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setDisplay("create")}
        >
          Create
        </button>
      </div>

      <div className="flex flex-col border-2 p-8 gap-y-8 ">
        <p>Join a server?</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setDisplay("join")}
        >
          Join
        </button>
      </div>
    </section>
  );
};

export default Menu;
