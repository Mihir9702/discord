import React from "react";
import Link from "next/link";

export default () => {
  return (
    <Link href={`/@me`}>
      <div className="server-icon bg-discord" />
    </Link>
  );
};
