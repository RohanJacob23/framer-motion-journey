import { useState } from "react";
import { MotionBadge } from "./MotionBadge";
import { AnimatePresence, motion } from "framer-motion";
import { MotionText } from "./MotionText";
import { cn } from "@/lib/utils";
import { Signal } from "lucide-react";
import { Badge } from "../ui/badge";

export const Analytics = () => {
  const [expand, setExpand] = useState(false);
  const lists = [
    { title: "/projects", visits: 254 },
    { title: "/group", visits: 212 },
    { title: "/order", visits: 251 },
    { title: "/template", visits: 24 },
  ];

  return (
    <motion.div
      className="flex flex-col overflow-hidden"
      onClick={() => {
        setExpand((prev) => !prev);
      }}
    >
      <AnimatePresence mode="popLayout">
        {expand && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.5 }}
            className="flex flex-col text-nowrap p-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">Traffic</p>
                <Badge variant="outline" className="rounded-full font-medium">
                  Last 3 Days
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">See all</p>
            </div>

            <ul className="m-0 list-none">
              {lists.map(({ title, visits }, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg text-sm transition-all duration-300 ease-in-out hover:bg-black/5 hover:px-2 dark:hover:bg-white/5"
                >
                  <p>{title}</p>
                  <p>{visits}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-2 rounded-lg p-2 py-1 md:gap-4">
        <motion.div>
          <Signal className={cn("size-4 text-blue-500 md:size-6")} />
        </motion.div>
        <p className="text-nowrap text-xs md:text-base">32 online now</p>

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
              <MotionText
                layoutId="text"
                layout="position"
                text="Top page /projects"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!expand ? (
          <MotionBadge
            layout="position"
            text="Analytics"
            color="blue"
            layoutId="badge"
          />
        ) : (
          <MotionBadge
            onClick={(e) => {
              e.stopPropagation();
              setExpand(false);
            }}
            layout="position"
            layoutId="badge"
            color="normal"
            text="close"
          />
        )}
      </div>
    </motion.div>
  );
};
