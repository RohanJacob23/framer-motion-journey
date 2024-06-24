"use client";

import { CommitIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Badge } from "../ui/badge";
import useMeasure from "react-use-measure";

export default function ActionToolbar() {
  const [showError, setShowError] = useState(false);
  const [elementRef, bounds] = useMeasure();

  return (
    <>
      <MotionConfig
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      >
        {/* commit badge */}
        <motion.div
          className="flex max-w-full cursor-pointer overflow-hidden rounded-lg bg-zinc-100 shadow dark:bg-zinc-900"
          animate={{ width: bounds.width }}
          onClick={() => setShowError((prev) => !prev)}
        >
          <div
            ref={elementRef}
            className="flex items-center gap-2 rounded-lg p-2 py-1 md:gap-4"
          >
            <CommitIcon className="size-4 text-warning md:size-6" />
            <p className="text-xs md:text-base">2e860de</p>

            <AnimatePresence mode="popLayout">
              {showError && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                  className="flex items-center gap-2 overflow-hidden text-nowrap"
                >
                  <div>·</div>
                  <p className="text-xs md:text-base">Failed to commit</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {!showError ? (
                <motion.div layoutId="badge" layout="position">
                  <Badge className="flex bg-warning-400 text-warning-950 hover:bg-warning-400/90 dark:bg-warning-950 dark:text-warning-500 dark:hover:bg-warning-950/90">
                    Failed
                  </Badge>
                </motion.div>
              ) : (
                <motion.div layoutId="badge" layout="position">
                  <Badge className="flex">redeploy</Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </>
  );
}
