import React from 'react'
import Backdrop from './Backdrop'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  handleClose: () => void
}

const Modal: React.FC<Props> = ({ handleClose, children }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div onClick={(e) => e.stopPropagation()}>{children}</motion.div>
    </Backdrop>
  )
}

export default Modal
