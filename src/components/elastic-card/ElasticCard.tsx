"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export default function ElasticCard() {
  const [elementRef, bounds] = useMeasure();
  const [isHovering, setIsHovering] = useState(false);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.35 }}>
      <Card className="w-80 overflow-hidden">
        <CardContent className="p-0">
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute inset-0 z-20 h-fit p-4 text-white dark:text-popover-foreground">
              <h1 className="text-center text-4xl underline">
                Welcome to the future
              </h1>
            </div>
            <div
              style={{ borderRadius: 12 }}
              className="absolute inset-0 z-10 hidden size-full bg-black/50 dark:block"
            />

            <motion.div
              style={{ borderRadius: 12 }}
              animate={{ scale: isHovering ? 1.1 : 1 }}
              className="overflow-hidden"
            >
              <Image
                src="/elastic-card/future.jpg"
                alt="future-image"
                width={400}
                height={400}
                className="size-full rounded-lg"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              layout
              animate={{ height: bounds.height }}
              className="absolute bottom-0 z-20 w-full rounded-t-lg bg-zinc-50 text-black"
            >
              <div ref={elementRef} className="space-y-2 p-2">
                <p className="font-semibold">Connect with the future</p>
                <AnimatePresence mode="popLayout">
                  {isHovering && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm text-muted-foreground">
                        Enable multiple image models at the same time with one
                        click.
                      </p>

                      <Button className="w-full bg-black text-white hover:bg-black/95">
                        Learn more
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-white text-black hover:bg-black/5 hover:text-black"
                      >
                        Learn more
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </MotionConfig>
  );
}
