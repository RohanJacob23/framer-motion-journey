"use client";

import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Nav() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Calendar Widget", href: "/calendar-widget" },
    { label: "Elastic Card", href: "/elastic-card" },
    { label: "Action Toolbar", href: "/action-toolbar" },
  ];
  const [showMenu, setShowMenu] = useState(false);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
      <nav className="sticky top-0 z-50 w-full backdrop-blur">
        <div className="flex items-center justify-between gap-4 border-b p-2 md:p-4">
          <h1 className="text-xl">Animation Library</h1>

          <button
            onClick={() => setShowMenu((prev) => !prev)}
            aria-expanded={showMenu}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {!showMenu ? (
                <motion.div
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                >
                  <HamburgerMenuIcon className="size-6" />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {showMenu ? (
                <motion.div
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                >
                  <Cross1Icon className="size-6" />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </button>
        </div>

        {/* menu */}
        <nav className="relative">
          <motion.div
            animate={{ height: showMenu ? "50vh" : 0 }}
            className="absolute top-0 z-50 w-full overflow-hidden bg-zinc-100 text-end dark:bg-zinc-900"
          >
            <AnimatePresence mode="popLayout">
              {showMenu && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      filter: "blur(0px)",
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.15,
                      },
                    },
                    exit: {
                      opacity: 0,
                      filter: "blur(10px)",
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full space-y-2 border-b p-2"
                >
                  {links.map((link, i) => (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                        exit: { opacity: 0 },
                      }}
                      key={i}
                      className="block text-2xl font-medium md:text-4xl"
                    >
                      <Link onClick={() => setShowMenu(false)} href={link.href}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>
      </nav>
    </MotionConfig>
  );
}
