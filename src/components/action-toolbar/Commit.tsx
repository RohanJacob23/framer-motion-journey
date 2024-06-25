import { useState } from "react";
import { MotionBadge } from "./MotionBadge";
import { AnimatePresence, motion } from "framer-motion";
import { CommitIcon } from "@radix-ui/react-icons";
import { MotionText } from "./MotionText";
import { cn } from "@/lib/utils";

export const Commit = () => {
  const [redeploy, setRedeploy] = useState(false);
  const [details, setDetails] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <motion.div
      className="flex flex-col"
      onClick={() => {
        setExpand((prev) => !prev);
        setDetails((prev) => prev && false);
      }}
    >
      <AnimatePresence mode="popLayout">
        {details && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.75 }}
            className="flex flex-col text-nowrap p-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Branch Toolbar v2</p>
              <p className="text-xs text-muted-foreground">2s ago</p>
            </div>

            <p className="mt-2.5 max-w-64 self-center overflow-hidden truncate rounded-lg bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800 md:p-2 md:text-sm">
              Deployed on landing page preview environment
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2 rounded-lg p-2 py-1 md:gap-4">
        <motion.div initial={false} animate={{ rotate: redeploy ? 360 : 0 }}>
          <CommitIcon
            className={cn(
              "size-4 text-warning md:size-6",
              redeploy && "text-green-500",
            )}
          />
        </motion.div>
        <p className="text-xs md:text-base">2e860de</p>

        <AnimatePresence mode="popLayout">
          {expand && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              className="flex items-center gap-2 overflow-hidden text-nowrap"
            >
              <div>·</div>
              {redeploy ? (
                <MotionText
                  layoutId="text"
                  layout="position"
                  text="Successfully redeployed"
                />
              ) : (
                <MotionText
                  layoutId="text"
                  layout="position"
                  text="Failed to commit"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!expand ? (
          <MotionBadge
            layout="position"
            text={redeploy ? "Details" : "Failed"}
            color={redeploy ? "normal" : "warning"}
            layoutId="badge"
          />
        ) : (
          <MotionBadge
            onClick={(e) => {
              e.stopPropagation();
              redeploy
                ? setDetails((prev) => !prev)
                : setRedeploy((prev) => !prev);
            }}
            layout="position"
            layoutId="badge"
            color="normal"
            text={redeploy ? (details ? "close" : "Details") : "Redeploy"}
          />
        )}
      </div>
    </motion.div>
  );
};
