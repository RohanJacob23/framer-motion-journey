"use client";

import React, { useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { Billing } from "./Billing";
import { Commit } from "./Commit";
import { Analytics } from "./Analytics";

export default function ActionToolbar() {
  const TABS: ("commit" | "analytics" | "upgrade")[] = [
    "commit",
    "analytics",
    "upgrade",
  ];
  const [activeTab, setActiveTab] = useState<
    "commit" | "analytics" | "upgrade"
  >(TABS[0]);

  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (activeTab) {
      case "commit":
        return <Commit />;
      case "analytics":
        return <Analytics />;
      case "upgrade":
        return <Billing />;
    }
  }, [activeTab]);

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
          <div ref={elementRef}>{content}</div>
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
                  className="absolute inset-0 size-full bg-zinc-100 dark:bg-zinc-900"
                />
              )}
            </div>
          ))}
        </motion.div>
      </MotionConfig>
    </>
  );
}
