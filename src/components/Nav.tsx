"use client";

import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import useMeasure from "react-use-measure";

export default function Navigation() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Components", openNav: true },
    { label: "Portfolio", href: "https://portfolio-xi-five-83.vercel.app" },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [menuElementRef, menuBounds] = useMeasure();

  const projectLinks = [
    {
      label: "Calendar Widget",
      href: "/calendar-widget",
      description:
        "Calendar widget with clear timezone differences information.",
    },
    {
      label: "Elastic Card",
      href: "/elastic-card",
      description:
        "Enable actions inside the card to trigger a playful and informative interaction.",
    },
    {
      label: "Action Toolbar",
      href: "/action-toolbar",
      description:
        "Toolbar that changes state to notify and enable information and actions.",
    },
    {
      label: "Morph Effect",
      href: "/morph",
      description: "Morph effect for the text",
    },
  ];

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
      <motion.nav
        animate={{ height: menuBounds.height }}
        style={{ borderRadius: 18 }}
        onMouseLeave={() => setShowMenu(false)}
        className="fixed inset-x-0 top-4 z-50 mx-auto w-4/5 border border-zinc-300 bg-zinc-200 backdrop-blur dark:border-border dark:bg-zinc-900 lg:max-w-lg"
      >
        <section ref={menuElementRef}>
          <div className="flex items-center justify-between gap-4 p-4 lg:justify-evenly">
            <h1 className="text-xl">Animation Library</h1>

            <div className="hidden space-x-4 lg:block">
              {links.map((link) => (
                <>
                  {link.href ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setShowMenu(false)}
                      className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span
                      key={link.href}
                      onMouseEnter={() => setShowMenu(true)}
                      className="cursor-pointer text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground"
                    >
                      {link.label}
                    </span>
                  )}
                </>
              ))}
            </div>

            <button
              className="block lg:hidden"
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

          {showMenu && (
            <ul className="m-0 grid list-none grid-cols-1 gap-2 p-2 lg:grid-cols-2">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setShowMenu(false)}
                    className="flex h-full flex-col justify-center rounded-lg p-2 text-base hover:bg-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <span>{link.label}</span>
                    <span className="hidden text-sm text-muted-foreground md:inline">
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </motion.nav>
    </MotionConfig>
  );
}
