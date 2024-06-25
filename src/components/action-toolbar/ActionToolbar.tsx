"use client";

import { CommitIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  MotionProps,
} from "framer-motion";
import { Badge } from "../ui/badge";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import {
  CircleDollarSignIcon,
  Globe,
  Mail,
  MessageSquare,
  Signal,
} from "lucide-react";
import { Button } from "../ui/button";

export default function ActionToolbar() {
  const TABS: ("commit" | "analytics" | "upgrade")[] = [
    "commit",
    "analytics",
    "upgrade",
  ];
  const [activeTab, setActiveTab] = useState<
    "commit" | "analytics" | "upgrade"
  >(TABS[0]);

  console.log(activeTab);

  const [elementRef, bounds] = useMeasure();

  const content = () => {
    switch (activeTab) {
      case "commit":
        return <Commit />;
      case "analytics":
        return <Analytics />;
      case "upgrade":
        return <Billing />;
    }
  };

  return (
    <>
      <MotionConfig
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
      >
        {/* commit badge */}
        <motion.div
          className={cn(
            "flex max-w-full cursor-pointer overflow-hidden rounded-lg bg-zinc-100 shadow dark:bg-zinc-900",
            activeTab === "upgrade" ? "items-start" : "items-end",
          )}
          animate={{
            width: bounds.width,
            height: bounds.height,
          }}
        >
          <div ref={elementRef}>{content()}</div>
        </motion.div>

        <motion.div className="flex items-center gap-2">
          {/* tab bar */}
          {TABS.map((tab, i) => (
            <div
              className="relative cursor-pointer p-2"
              key={i}
              onClick={() => setActiveTab(tab)}
            >
              <p className="relative z-10 text-xs md:text-sm">{tab}</p>
              {activeTab === tab && (
                <motion.div
                  layoutId="tab"
                  style={{ borderRadius: 8 }}
                  className="absolute inset-0 size-full bg-zinc-900"
                />
              )}
            </div>
          ))}
        </motion.div>
      </MotionConfig>
    </>
  );
}

interface MotionLayout {
  layout?: boolean | "position" | "size" | "preserve-aspect" | undefined;
}

const MotionText = ({
  text,
  layoutId,
  layout = false,
  ...props
}: {
  text: string;
  layoutId?: string;
} & MotionLayout) => {
  return (
    <motion.p
      layoutId={layoutId}
      layout={layout}
      className="max-w-28 truncate text-xs md:max-w-none md:text-base"
      {...props}
    >
      {text}
    </motion.p>
  );
};

interface MotionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color: "normal" | "warning" | "success" | "blue" | "yellow";
  text: string;
  layoutId?: string;
}

const MotionBadge = ({
  color,
  text,
  layout = false,
  layoutId,
  ...props
}: MotionBadgeProps & MotionLayout & MotionProps) => {
  return (
    <motion.div layoutId={layoutId} layout={layout} {...props}>
      <Badge
        className={cn(
          "flex text-nowrap",
          color === "success" &&
            "bg-green-200 text-green-900 hover:bg-green-500/90 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-950/90",
          color === "warning" &&
            "bg-warning-400 text-warning-950 hover:bg-warning-400/90 dark:bg-warning-950 dark:text-warning-500 dark:hover:bg-warning-950/90",
          color === "blue" &&
            "bg-blue-200 text-blue-900 hover:bg-blue-500/90 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-950/90",
          color === "yellow" &&
            "bg-yellow-200 text-yellow-900 hover:bg-yellow-500/90 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-950/90",
        )}
      >
        {text}
      </Badge>
    </motion.div>
  );
};

const Commit = () => {
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

            <p className="mt-2.5 max-w-64 self-center overflow-hidden truncate rounded-lg bg-zinc-800 px-2 py-1 text-xs md:p-2 md:text-sm">
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

const Analytics = () => {
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
                  className="flex items-center justify-between rounded-lg text-sm transition-all duration-300 ease-in-out hover:bg-white/5 hover:px-2"
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
              setExpand((prev) => false);
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

const Billing = () => {
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
              <Button className="w-full border border-yellow-500 bg-transparent text-white hover:bg-white/5">
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
