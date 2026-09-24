import React, { useState } from "react";

interface Props {
  name: string;
  icon?: string | null;
  size?: "nav" | "md" | "lg";
  active?: boolean; // nav only - the selected server keeps the rounded square
}

// "Alpha Squad" -> "AS"
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3);
}

// server image, or the server's initials when there isn't one (or it fails to load)
export default ({ name, icon, size = "md", active = false }: Props) => {
  // the url that failed to load - a new url gets a fresh try
  const [failed, setFailed] = useState<string | null>(null);

  const css = {
    nav: `server-icon ${active ? "hover-icon" : ""}`,
    md: "w-[48px] h-[48px] text-md rounded-2xl bg-lightblue text-white",
    lg: "w-20 h-20 text-2xl rounded-3xl bg-lightblue text-white",
  }[size];

  if (icon && failed !== icon) {
    const shape =
      size === "nav"
        ? `w-[48px] h-[48px] transition-all ${
            active ? "rounded-2xl" : "rounded-[50%] hover:rounded-2xl"
          }`
        : css;
    return (
      <img
        src={icon}
        alt={name}
        onError={() => setFailed(icon)}
        className={`${shape} object-cover shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${css} flex items-center justify-center shrink-0 font-sans select-none`}
    >
      {initials(name)}
    </div>
  );
};
