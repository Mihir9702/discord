import React from "react";

export default () => {
  const css = "h-4 bg-gray-200 rounded-full dark:bg-darkish w-64 mb-2.5";
  return (
    <div
      role="status"
      className="max-w-sm mt-7 animate-pulse flex flex-col items-center gap-6"
    >
      <div className={css} />
      <div className={css} />
      <div className={css} />
      <div className={css} />
      <div className={css} />
      <div className={css} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
