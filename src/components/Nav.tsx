"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ChevronDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import SideDrawer from "./SideDrawer";
import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";

export default function Navigation() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Components", openNav: true },
    { label: "Portfolio", href: "https://portfolio-xi-five-83.vercel.app" },
  ];

  const componentLinks = [
    { label: "Clip Path Tab", link: "/tab" },
    { label: "Family Drawer", link: "/familyDrawer" },
    { label: "Create New Disclosure", link: "/createNew-disclosure" },
    { label: "Pricing Widget", link: "/pricing-widget" },
  ];

  const [showSideDrawer, setShowSideDrawer] = useState(false);
  return (
    <Fragment>
      <SideDrawer open={showSideDrawer} setOpen={setShowSideDrawer}>
        <ul className="flex flex-col gap-2 text-xl font-medium">
          {links.map((link, i) =>
            link.href && !link.openNav ? (
              <Link
                key={i}
                href={link.href}
                onClick={() => setShowSideDrawer(false)}
                className="rounded-lg p-2 md:hidden"
              >
                {link.label}
              </Link>
            ) : (
              <DropDown
                key={i}
                label={link.label}
                setShowSideDrawer={setShowSideDrawer}
                componentLinks={componentLinks}
              />
            ),
          )}
          {componentLinks.map((link, i) => (
            <Link
              key={i}
              href={link.link}
              className="hidden rounded-lg p-2 md:inline-block"
              onClick={() => setShowSideDrawer(false)}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </SideDrawer>

      <nav className="fixed inset-x-0 top-2 z-50 mx-auto w-4/5 overflow-y-hidden rounded-lg border bg-background backdrop-blur lg:max-w-lg">
        <div className="flex items-center justify-between gap-4 p-4 lg:justify-evenly">
          <h1 className="text-xl">Animation Library</h1>

          <div className="hidden space-x-4 md:block">
            {links.map((link, i) => (
              <Fragment key={i}>
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={() => setShowSideDrawer(false)}
                    className="text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    onClick={() => setShowSideDrawer(true)}
                    className="cursor-pointer text-muted-foreground transition-colors duration-300 ease-in-out hover:text-foreground"
                  >
                    {link.label}
                  </span>
                )}
              </Fragment>
            ))}
          </div>

          <Button
            variant="ghost"
            className="inline-flex md:hidden"
            onClick={() => setShowSideDrawer((prev) => !prev)}
            aria-expanded={showSideDrawer}
            size="icon"
          >
            <HamburgerMenuIcon className="size-6" />
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {showSideDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="absolute inset-0 z-10 size-full bg-black/75 dark:bg-black/50"
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
}

const DropDown = ({
  label,
  componentLinks,
  setShowSideDrawer,
}: {
  label: string;
  setShowSideDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  componentLinks: {
    label: string;
    link: string;
  }[];
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [ref, { height }] = useMeasure();
  return (
    <motion.li
      animate={{ height }}
      transition={{ type: "spring", duration: 0.5, bounce: 0 }}
      className="overflow-hidden rounded-lg md:hidden"
    >
      <div ref={ref} className="p-2">
        <div
          className="flex items-center gap-2"
          onClick={() => setDropDown(!dropDown)}
        >
          <span>{label}</span>
          <ChevronDownIcon
            className={cn(
              "size-4 transition-transform duration-300 ease-in-out",
              dropDown && "rotate-180",
            )}
          />
        </div>

        {dropDown && (
          <div className="mt-2 space-y-2 border-l-2 pl-4">
            {componentLinks.map((link, i) => (
              <Link
                key={i}
                href={link.link}
                onClick={() => setShowSideDrawer(false)}
                className="block text-base font-normal text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};
