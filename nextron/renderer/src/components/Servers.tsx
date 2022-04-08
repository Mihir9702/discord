import React from "react";

const Servers = () => {
  const serverNames = [
    "Ciera",
    "Illysia",
    "Kami",
    "Diza",
    "Philos",
    "Amora",
    "Neo",
    "Gyru",
    "Helta",
    "Luna",
    "Millies",
    "Opal",
    "Pheobe",
  ];

  return (
    <ul className="bg-zinc-800 p-[1.25rem]">
      {serverNames.map((name) => (
        <li key={name}>
          <div className="server-icon p-5 w-16 my-3 m-auto bg-gray-900 text-gray-100 hover:bg-gray-800 group transition-all duration-300 cursor-pointer select-none">
            <div className="flex justify-center items-center mx-auto">
              {name.charAt(0)}
              <span className="hidden absolute ml-32 group-hover:inline">
                {name}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Servers;
