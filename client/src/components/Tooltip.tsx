import React, { useState } from "react";
import { motion } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "right";
}

const positions = {
  bottom: "absolute top-4 mt-2",
  top: "absolute bottom-full mb-2",
  right: "fixed", // placed next to the target so scroll containers can't clip it
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "bottom",
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setRect(e.currentTarget.getBoundingClientRect());
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const style =
    position === "right" && rect
      ? {
          left: rect.right + 16,
          top: rect.top + rect.height / 2,
          transform: "translateY(-50%)",
        }
      : undefined;

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
        <div
          className={`${positions[position]} z-50 pointer-events-none`}
          style={style}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#111315] text-[#c9ccd0] text-md whitespace-nowrap font-sans font-normal py-1 px-2 rounded"
          >
            {content}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
