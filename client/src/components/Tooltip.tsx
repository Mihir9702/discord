import React, { useState } from "react";
import { motion } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isTooltipVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 z-10 bg-[#111315] text-[#c9ccd0] text-md whitespace-nowrap font-sans font-normal py-1 px-2 rounded mt-2"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
