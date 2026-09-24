import React from "react";
import { statusColor } from "src/utils/statusColor";

interface Props {
  iconId?: string | null;
  status?: string | null;
  name?: string | null; // first letter is drawn inside the avatar
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: "w-8 h-8 text-sm", dot: "w-3 h-3 bottom-0 right-0" },
  md: { icon: "w-10 h-10 text-lg", dot: "w-3.5 h-3.5 bottom-0 right-0" },
  lg: { icon: "w-20 h-20 text-4xl", dot: "w-5 h-5 bottom-0.5 right-0.5" },
};

// a user's avatar: their iconId color + an optional status dot
export default ({ iconId, status, name, size = "sm" }: Props) => {
  const css = sizes[size];

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={`${css.icon} rounded-full flex items-center justify-center text-white font-semibold select-none`}
        style={{ backgroundColor: iconId || "#5864f2" }}
      >
        {name ? name[0].toUpperCase() : null}
      </div>
      {status && (
        <span
          title={status}
          className={`${
            css.dot
          } absolute rounded-full ring-2 ring-mid ${statusColor(status)}`}
        />
      )}
    </div>
  );
};
