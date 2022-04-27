import React from 'react'
import { motion } from 'framer-motion'

const Backdrop = (props: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-gray-900"
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.95 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  )
}

export default Backdrop
