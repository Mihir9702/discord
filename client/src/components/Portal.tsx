import React from "react";
import { createPortal } from "react-dom";

// renders overlays on <body> so no parent stacking context can hide them
// (overlays only open after user interaction, so there's no server render to match)
export default ({ children }: { children: React.ReactNode }) => {
  if (typeof document === "undefined") return null;

  return createPortal(children, document.body);
};
