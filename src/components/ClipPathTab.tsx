"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Interface for position properties
interface Position {
  top: number;
  left: number;
  width: number;
}

/**
 * Component for displaying a tab with clip path animation
 */
export default function ClipPathTab() {
  // Memoized array of links
  const links = useMemo(() => ["Link1", "Link2", "Link3", "Link4"], []);
  // State for position
  const [position, setPosition] = useState<Position | undefined>();
  const [hoverPosition, setHoverPosition] = useState<
    (Position & { height: number; opacity: number }) | undefined
  >();

  // Effect to set initial position based on the first link
  useEffect(() => {
    const list = document.getElementById(links[0]);
    if (list) {
      setPosition({
        top: list.offsetTop,
        left: list.offsetLeft,
        width: list.offsetWidth,
      });
    }
  }, [links]);

  // Handle click event to update position
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const list = e.currentTarget;
    setPosition({
      top: list.offsetTop,
      left: list.offsetLeft,
      width: list.offsetWidth,
    });
  };
  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log(hoverPosition);
    const list = e.currentTarget;
    setHoverPosition({
      top: list.offsetTop,
      left: list.offsetLeft,
      width: list.offsetWidth,
      height: list.offsetHeight,
      opacity: 1,
    });
  };

  // Render the component
  return (
    <div className="relative">
      {/* List of links */}
      <ul
        onMouseLeave={() =>
          setHoverPosition((prev) => prev && { ...prev, opacity: 0 })
        }
        className="relative z-10 flex gap-4 rounded-lg bg-zinc-200 p-2 dark:bg-zinc-900"
      >
        {links.map((link, i) => (
          <li
            key={i}
            id={link}
            onClick={handleClick}
            onMouseEnter={handleMouseOver}
            className="relative z-10 cursor-pointer p-2"
          >
            {link}
          </li>
        ))}
        <Cursor hoverPosition={hoverPosition} />
      </ul>

      {/* Overlapping links with clip path animation */}
      <ClipNav links={links} position={position} />
    </div>
  );
}

const ClipNav = ({
  links,
  position,
}: {
  links: string[];
  position: Position | undefined;
}) => {
  return (
    <motion.ul
      initial={{ clipPath: "inset(100%)" }}
      animate={{
        clipPath: position
          ? `inset(${position.top}px calc(100% - ${position.left + position.width}px) ${position.top}px ${position.left}px round 8px)`
          : "inset(100%)",
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      className="absolute inset-0 z-30 flex size-full gap-4 rounded-lg bg-zinc-900 p-2 text-white dark:bg-zinc-200 dark:text-black"
    >
      {links.map((link, i) => (
        <li key={i} className="p-2">
          {link}
        </li>
      ))}
    </motion.ul>
  );
};

const Cursor = ({
  hoverPosition,
}: {
  hoverPosition:
    | (Position & {
        height: number;
        opacity: number;
      })
    | undefined;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={hoverPosition}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
      className="absolute inset-0 z-0 rounded-lg bg-white dark:bg-black"
    />
  );
};
