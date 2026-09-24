import React from "react";
import { motion } from "framer-motion";
import Portal from "./Portal";

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  dark?: boolean;
}

export default (props: ModalProps) => {
  return (
    <Portal>
      <motion.div
        className={`
      fixed inset-0 z-50
      w-full h-screen
      flex justify-center items-center
      ${props.dark ? "bg-[#070809]/80" : "bg-transparent"}
      `}
        onClick={props.handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div onClick={(e) => e.stopPropagation()}>
          {props.children}
        </motion.div>
      </motion.div>
    </Portal>
  );
};
