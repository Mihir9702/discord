import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  dark?: boolean;
}

export default (props: ModalProps) => {
  return (
    <motion.div
      className={`
      fixed inset-0 z-50
      w-full h-screen
      flex justify-center items-center
      ${props.dark ? "bg-[#070809]" : "bg-transparent"}
      `}
      onClick={props.handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.97 }}
      exit={{ opacity: 0 }}
    >
      <motion.div onClick={(e) => e.stopPropagation()}>
        {props.children}
      </motion.div>
    </motion.div>
  );
};
