import { useState } from "react";
import { MotionBadge } from "./MotionBadge";
import { AnimatePresence, motion } from "framer-motion";
import { MotionText } from "./MotionText";
import { cn } from "@/lib/utils";
import { CircleDollarSignIcon, Globe, Mail, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export const Billing = () => {
  const [expand, setExpand] = useState(false);
  const [details, setDetails] = useState(false);
  const features = [
    {
      title: "24/7 support through chat and email",
      icon: <MessageSquare className="size-4 text-yellow-500" />,
    },
    {
      title: "Email redirection",
      icon: <Mail className="size-4 text-yellow-500" />,
    },
    {
      title: "More web analytics",
      icon: <Globe className="size-4 text-yellow-500" />,
    },
    {
      title: "Access to all integrations",
      icon: <MessageSquare className="size-4 text-yellow-500" />,
    },
  ];

  return (
    <motion.div
      className="flex flex-col"
      onClick={() => {
        setExpand((prev) => !prev);
        setDetails((prev) => prev && false);
      }}
    >
      <div className="flex items-center gap-2 rounded-lg p-2 py-1 md:gap-4">
        <motion.div>
          <CircleDollarSignIcon
            className={cn("size-4 text-yellow-500 md:size-6")}
          />
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
                text="Upgrade to pro and save $12"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!expand ? (
          <MotionBadge
            layout="position"
            text="Billing"
            color="yellow"
            layoutId="badge"
            onClick={(e) => {
              e.stopPropagation();
              setExpand(true);
            }}
          />
        ) : (
          <MotionBadge
            onClick={(e) => {
              e.stopPropagation();
              details ? setDetails(false) : setDetails(true);
            }}
            layout="position"
            layoutId="badge"
            color="normal"
            text={details ? "close" : "See Pro"}
          />
        )}
      </div>
      <AnimatePresence mode="popLayout">
        {details && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.75 }}
            className="flex flex-col text-nowrap p-2"
          >
            <ul className="m-0 list-none">
              {features.map(({ title, icon }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-lg text-sm text-muted-foreground"
                >
                  {icon}
                  <p>{title}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button className="w-full border border-yellow-500 bg-transparent text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/5">
                See other plans
              </Button>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                Select Pro
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
