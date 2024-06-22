"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function Nav() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Calendar Widget", href: "/calendar-widget" },
  ];
  const [activeTab, setActiveTab] = useState("");
  const { theme, setTheme } = useTheme();
  return (
    <nav
      className="flex items-center justify-center gap-4 p-2 md:p-4 border-b"
      onMouseLeave={() => setActiveTab("")}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onMouseEnter={() => setActiveTab(link.href)}
          onMouseLeave={() => setActiveTab(link.href)}
          className="relative p-2 rounded"
        >
          <span>{link.label}</span>
          <AnimatePresence>
            {activeTab === link.href ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                layoutId="navHover"
                className="absolute inset-0 rounded-lg size-full bg-black/15 dark:bg-white/15"
              />
            ) : null}
          </AnimatePresence>
        </Link>
      ))}
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        <span className="dark:hidden">Light</span>
        <span className="hidden dark:inline">Dark</span>
      </Button>
    </nav>
  );
}
