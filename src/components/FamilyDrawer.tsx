"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { DefaultView, Key, Phrase, RemoveWallet } from "./Views";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function FamilyDrawer() {
  const [show, setShow] = useState(false);
  const [view, setView] = useState("default");

  const [elementRef, { height }] = useMeasure();

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setShow(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

  return (
    <Fragment>
      <section className="grid size-full max-h-[28rem] max-w-screen-md place-items-center rounded-lg border-2 bg-background">
        <Button onClick={handleOpen}>Try it out</Button>
      </section>

      <AnimatePresence mode="popLayout" initial={false}>
        {show && (
          <Fragment>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 z-10 size-full bg-black/80"
            />

            {/* drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) handleClose();
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 0.5 }}
              transition={{
                ease: [0.25, 1, 0.5, 1],
                duration: 0.27,
              }}
              className="absolute bottom-0 z-20 pb-4"
            >
              <motion.div
                animate={{ height }}
                className="w-80 overflow-clip rounded-lg bg-white text-black"
              >
                <div ref={elementRef} className="relative p-4">
                  <Button
                    size="icon"
                    className="absolute right-4 top-4 z-50 size-6 rounded-full bg-zinc-300"
                    onClick={handleClose}
                  >
                    <Cross1Icon className="size-4" />
                  </Button>
                  {/* content */}
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={view}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        ease: [0.25, 1, 0.5, 1],
                        duration: 0.27,
                      }}
                    >
                      {content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
