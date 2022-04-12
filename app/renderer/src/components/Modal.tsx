import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const Modal = ({ handleClose, children }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div onClick={(e) => e.stopPropagation()}>{children}</motion.div>
    </Backdrop>
  );
};

export default Modal;
