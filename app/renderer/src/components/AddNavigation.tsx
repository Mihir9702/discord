import React from "react";
import Modal from "./Modal";

type Props = { ds: boolean; setds: any };

const AddNavigation: React.FC<Props> = ({ ds, setds }) => {
  const blah = () => {
    setds(!ds);
  };

  return (
    <button className="nav-icon" onClick={blah}>
      <svg
        className="w-6 h-6 "
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );
};

export default AddNavigation;
