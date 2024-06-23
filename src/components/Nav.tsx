"use client";

import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { exit } from "process";

export default function Nav() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Calendar Widget", href: "/calendar-widget" },
    { label: "Elastic Card", href: "/elastic-card" },
  ];
  const [showMenu, setShowMenu] = useState(false);
  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
      <nav className="sticky top-0 z-50 w-full backdrop-blur">
        <div className="flex items-center justify-between gap-4 border-b p-2 md:p-4">
          <h1 className="text-xl">Animation Library</h1>

          <div onClick={() => setShowMenu((prev) => !prev)}>
            <HamburgerMenuIcon className="size-6" />
          </div>
        </div>

        {/* menu */}
        <div className="relative">
          <motion.div
            animate={{ height: showMenu ? "50vh" : 0 }}
            className="absolute top-0 z-50 w-full overflow-hidden bg-background text-end"
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
                      className="block text-2xl md:text-4xl"
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
        </div>
      </nav>
    </MotionConfig>
  );
}

// {links.map((link) => (
//   <Link
//     key={link.href}
//     href={link.href}
//     onMouseEnter={() => setActiveTab(link.href)}
//     onMouseLeave={() => setActiveTab(link.href)}
//     className="relative rounded p-2"
//   >
//     <span>{link.label}</span>
//     <AnimatePresence>
//       {activeTab === link.href ? (
//         <motion.div
//           layout
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ type: "spring", duration: 0.4, bounce: 0 }}
//           layoutId="navHover"
//           className="absolute inset-0 size-full rounded-lg bg-black/15 dark:bg-white/15"
//         />
//       ) : null}
//     </AnimatePresence>
//   </Link>
// ))}
