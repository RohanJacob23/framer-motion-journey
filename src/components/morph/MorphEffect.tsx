"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MorphText } from "./MorphText";
import { motion } from "framer-motion";

export default function MorphEffect() {
  const [textIndex, setTextIndex] = useState(0);
  const textList = useMemo(() => ["Developer", "Designer", "Freelancer"], []);

  useEffect(() => {
    const toggleText = () => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textList.length);
    };
    const interval = setInterval(toggleText, 1500);
    return () => clearInterval(interval);
  }, [textList]);
  return (
    <>
      <h1>
        <span>
          <MorphText>{textList[textIndex]}</MorphText>
        </span>{" "}
        <span>Developer</span>
      </h1>
    </>
  );
}
