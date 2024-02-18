import React from "react";

export default () => {
  const first = "h-2.5 bg-gray-300 rounded-full dark:bg-highlight w-24 mb-2.5";
  const second = "w-32 h-2 bg-gray-200 rounded-full dark:bg-highlight";
  const third = "h-2.5 bg-gray-300 rounded-full dark:bg-highlight w-12";
  const container = "flex items-center justify-between pt-4";
  return (
    <div
      role="status"
      className="max-w-md p-4 space-y-4 border border-dash divide-y divide-white rounded shadow animate-pulse dark:divide-darkish md:p-6 dark:border-darkish"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={first} />
          <div className={second} />
        </div>
        <div className={third} />
      </div>

      <div className={container}>
        <div>
          <div className={first} />
          <div className={second} />
        </div>
        <div className={third} />
      </div>

      <div className={container}>
        <div>
          <div className={first} />
          <div className={second} />
        </div>
        <div className={third} />
      </div>

      <div className={container}>
        <div>
          <div className={first} />
          <div className={second} />
        </div>
        <div className={third} />
      </div>

      <div className={container}>
        <div>
          <div className={first} />
          <div className={second} />
        </div>
        <div className={third} />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
