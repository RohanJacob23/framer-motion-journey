import { MotionLayout } from "@/types/types";
import { motion } from "framer-motion";

export const MotionText = ({
  text,
  layoutId,
  layout = false,
  ...props
}: {
  text: string;
  layoutId?: string;
} & MotionLayout) => {
  return (
    <motion.p
      layoutId={layoutId}
      layout={layout}
      className="max-w-20 truncate text-xs md:max-w-none md:text-base"
      {...props}
    >
      {text}
    </motion.p>
  );
};
