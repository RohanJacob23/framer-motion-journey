"use client";

import React, { Fragment, useEffect } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function SideDrawer({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (open) {
      animate(
        "main",
        { scale: 0.95, borderRadius: 12 },
        { type: "spring", duration: 0.5, bounce: 0 },
      );
    } else
      animate(
        "main",
        { scale: 1, borderRadius: 0 },
        { type: "spring", duration: 0.5, bounce: 0 },
      );
  }, [open]);
  return (
    <Fragment>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ x: "100%", filter: "blur(8px)" }}
            animate={{ x: 0, filter: "blur(0px)" }}
            exit={{ x: "100%", filter: "blur(8px)" }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="absolute right-0 z-[100] h-full w-3/4 max-w-sm p-2"
          >
            <div className="flex size-full flex-col rounded-lg border bg-background p-2">
              <Button
                variant="ghost"
                size="icon"
                className="self-end rounded-full"
                onClick={() => setOpen(false)}
              >
                <Cross1Icon className="size-4" />
              </Button>

              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
