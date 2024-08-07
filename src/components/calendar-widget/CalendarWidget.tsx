"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { VideoIcon } from "lucide-react";

/**
 * React component that animates a card to show additional content when clicked.
 * Displays a badge, text, and an icon, and expands to show a list of avatars.
 */
export default function CalendarWidget() {
  // State to track whether the card is expanded or not
  const [expanded, setExpanded] = useState(false);

  // Variants for the camera icon animation
  const cameraVariants = {
    visible: { opacity: 1, filter: "blur(0px)" },
    hidden: { opacity: 0, filter: "blur(10px)" },
  };

  // Variants for the content animation
  const contentVariants = {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
  };

  return (
    // Configure the motion for the entire component
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}>
      <motion.div
        // Toggle the expanded state when clicked
        onClick={() => setExpanded((expanded) => !expanded)}
        layout
        className="flex w-fit flex-col justify-center overflow-hidden rounded-lg border bg-zinc-100 dark:bg-zinc-900"
      >
        <motion.div
          layout="position"
          // Animate the width of the card based on the expanded state
          animate={{ width: expanded ? 420 : "fit-content" }}
          className="max-w-64 md:max-w-none"
        >
          <div className="flex justify-between p-4">
            <motion.div layout="position">
              <Badge className="bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-200">
                In 15 mins
              </Badge>
              <p className="text-nowrap font-semibold">Design Sync</p>
              <p className="text-muted-foreground">2:30pm</p>
            </motion.div>

            <motion.div
              layout
              initial={false}
              variants={cameraVariants}
              // Toggle the visibility of the camera icon based on the expanded state
              animate={expanded ? "visible" : "hidden"}
            >
              <VideoIcon className="size-6" />
            </motion.div>
          </div>

          {/* Animate the appearance and disappearance of the content */}
          <AnimatePresence mode="popLayout">
            {expanded && (
              <motion.div
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full space-y-2 border-t py-4"
              >
                <div className="px-4">
                  <p>Guests</p>
                </div>

                {/* Render a list of avatars */}
                <div className="flex -space-x-2 px-4">
                  {[...Array(3)].map((_, i) => (
                    <Avatar key={i} className={cn("", `z-[${i + 1}]`)}>
                      <AvatarFallback className="rounded-full border-2 border-zinc-500 shadow-xl">
                        RJ
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
