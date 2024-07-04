"use client";

import React from "react";
import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";

const TextEnter = ({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 1.5 }}>
      <motion.h1
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        className={cn("inline-block text-inherit", className)}
      >
        {children.split(" ").map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 70, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </MotionConfig>
  );
};

export default TextEnter;
