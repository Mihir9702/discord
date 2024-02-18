import React from "react";
import { motion } from "framer-motion";

export default () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="flex items-center justify-around w-10 h-10">
        <Span />
        <Span delay={0.2} />
        <Span delay={0.3} />
      </section>
    </main>
  );
};

function Span({ delay }: { delay?: number }) {
  return (
    <motion.span
      className="block bg-lightblue p-1 rounded-full"
      transition={{
        y: {
          duration: 1,
          yoyo: Infinity,
          ease: "easeOut",
          repeat: Infinity,
          delay: delay,
        },
      }}
      animate={{
        y: ["100%", "-100%", "100%"],
      }}
    />
  );
}
