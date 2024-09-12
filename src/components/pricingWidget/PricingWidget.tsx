"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
} from "framer-motion";
import { Check } from "@phosphor-icons/react";

export default function PricingWidget() {
  const [active, setActive] = useState("plan-1");
  const [activePosition, setActivePosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderWidth: 0,
    opacity: 0,
  });

  const [billing, setBilling] = useState<"Monthly" | "Yearly">("Monthly");

  const plans = [
    {
      name: "Free",
      mothly: 0,
      yearly: 0,
    },
    {
      name: "Starter",
      mothly: 9.99,
      yearly: 7.49,
    },
    {
      name: "Pro",
      mothly: 19.99,
      yearly: 17.49,
    },
  ];

  useEffect(() => {
    const ele = document.getElementById("plan-1");
    if (ele) {
      setActivePosition({
        top: ele.offsetTop,
        left: ele.offsetLeft,
        width: ele.offsetWidth,
        height: ele.offsetHeight,
        borderWidth: 2,
        opacity: 1,
      });
    }
  }, []);

  const handleActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setActive(e.currentTarget.id);
    const item = e.currentTarget;
    setActivePosition({
      top: item.offsetTop,
      left: item.offsetLeft,
      width: item.offsetWidth,
      height: item.offsetHeight,
      borderWidth: 2,
      opacity: 1,
    });
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}>
      <div className="flex min-w-72 flex-col gap-4 rounded-xl bg-neutral-100 p-2 py-4 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50">
        {/* tab */}
        <PricingTab setBilling={setBilling} />

        {/* pricing options */}
        <div className="relative flex flex-col gap-2">
          {plans.map((plan, i) => (
            <LayoutGroup key={i} id={`layout-${i}`}>
              <PricingCard
                id={`plan-${i}`}
                amount={billing === "Monthly" ? plan.mothly : plan.yearly}
                name={plan.name}
                active={active === `plan-${i}`}
                handleActive={handleActive}
              />
            </LayoutGroup>
          ))}

          {/* acitve state */}
          <motion.div
            initial={{
              borderWidth: 0,
              opacity: 0,
            }}
            animate={activePosition}
            style={{ borderRadius: 12 }}
            className="absolute z-10 border-2 border-black bg-transparent dark:border-white"
          />
        </div>

        <button className="rounded-full bg-neutral-900 p-2 text-neutral-100 hover:bg-neutral-900/90 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100/80">
          Get Started
        </button>
      </div>
    </MotionConfig>
  );
}

const PricingTab = ({
  setBilling,
}: {
  setBilling: React.Dispatch<React.SetStateAction<"Monthly" | "Yearly">>;
}) => {
  const [position, setPosition] = useState({
    top: 4,
    left: 4,
    width: 130.5,
    height: 28,
  });
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: "Monthly" | "Yearly",
  ) => {
    setBilling(value);
    const item = e.currentTarget;
    setPosition({
      top: item.offsetTop,
      left: item.offsetLeft,
      width: item.offsetWidth,
      height: item.offsetHeight,
    });
  };
  return (
    <div className="relative flex items-center rounded-2xl bg-neutral-300 p-1 text-center dark:bg-neutral-700">
      <div
        onClick={(e) => handleClick(e, "Monthly")}
        className="relative z-20 grow cursor-pointer font-semibold"
      >
        <p>Monthly</p>
      </div>
      <div
        onClick={(e) => handleClick(e, "Yearly")}
        className="relative z-20 grow cursor-pointer font-semibold"
      >
        <p>Yearly</p>
      </div>

      {/* active state */}
      <motion.div
        initial={{
          top: 4,
          left: 4,
          width: 130.5,
          height: 28,
        }}
        animate={position}
        style={{ borderRadius: 12 }}
        className="absolute z-10 bg-neutral-100 dark:bg-neutral-900"
      />
    </div>
  );
};

const PricingCard = ({
  handleActive,
  id,
  name,
  amount,
  active = false,
}: {
  handleActive: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
  name: string;
  amount: number;
  active?: boolean;
}) => {
  return (
    <div
      id={id}
      onClick={handleActive}
      className="flex items-center justify-between rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-2 shadow dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-white/10"
    >
      <div className="relativ z-20">
        <h3>{name}</h3>
        <p className="font-semibold">
          $<MorphEffect>{amount.toString()}</MorphEffect>
          <span className="font-medium text-muted-foreground">/month</span>
        </p>
      </div>
      {active ? (
        <div className="relativ z-20 rounded-full bg-black p-1 dark:bg-white">
          <Check size={16} className="text-white dark:text-black" />
        </div>
      ) : (
        <div className="relativ z-20 size-6 rounded-full border border-black bg-transparent dark:border-white" />
      )}
    </div>
  );
};

const MorphEffect = ({ children }: { children: string }) => {
  function generateKeys(text: string) {
    const charCount: { [key: string]: number } = {};

    return text.split("").map((char) => {
      if (!charCount[char]) {
        charCount[char] = 0;
      }
      const key = `${char}-${charCount[char]}`;
      charCount[char]++;
      return { char, key };
    });
  }

  const textToDisplay = generateKeys(children as string);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {textToDisplay.map(({ char, key }, i) => (
        <motion.span
          key={key}
          layoutId={key}
          initial={{ opacity: 0, y: -25, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          className="inline-block text-inherit"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};
