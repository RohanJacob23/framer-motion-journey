"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="fixed bottom-4 right-4 z-10 rounded-lg"
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
