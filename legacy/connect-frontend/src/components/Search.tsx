import React from "react";

export default () => {
  const handleSearch = () => {
    console.log("Search");
  };
  // Notes:
  // Call function that searches users: friends & servers
  // Stuff them in an array and filter based on input value
  // Section with 5 possible searches "like google search"

  return (
    <sub className="p-2 shadow shadow-darkish">
      <input
        className="w-full h-full p-1 px-2 rounded placeholder:text-md placeholder:font-light placeholder:font-sans placeholder:text-left text-[#949BA4] bg-[#1e1f22] focus:outline-0"
        type="text"
        placeholder="Find or start a conversation"
      />
    </sub>
  );
};
