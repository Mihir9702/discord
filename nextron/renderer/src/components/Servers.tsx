import Link from "next/link";
import React from "react";

const Servers = () => {
  const [active, setActive] = React.useState(false);

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
        <React.Fragment key={name}>
          <li className={`hover:${() => setActive(!active)}`}>
            <Link href={`/servers/${name}`}>
              <div className="server-icon p-5 w-16 my-3 m-auto bg-gray-900 text-gray-100 hover:bg-gray-800 transition-all duration-300 cursor-pointer select-none">
                <div className="relative flex justify-center items-center mx-auto">
                  {/* Server Icon */}
                  {name.charAt(0)}
                </div>
              </div>
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Servers;
