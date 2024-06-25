import { MotionLayout } from "@/types/types";
import { MotionProps } from "framer-motion";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MotionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color: "normal" | "warning" | "success" | "blue" | "yellow";
  text: string;
  layoutId?: string;
}
export const MotionBadge = ({
  color,
  text,
  layout = false,
  layoutId,
  ...props
}: MotionBadgeProps & MotionLayout & MotionProps) => {
  return (
    <motion.div layoutId={layoutId} layout={layout} {...props}>
      <Badge
        className={cn(
          "flex text-nowrap",
          color === "success" &&
            "bg-green-200 text-green-900 hover:bg-green-500/90 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-950/90",
          color === "warning" &&
            "bg-warning-400 text-warning-950 hover:bg-warning-400/90 dark:bg-warning-950 dark:text-warning-500 dark:hover:bg-warning-950/90",
          color === "blue" &&
            "bg-blue-200 text-blue-900 hover:bg-blue-500/90 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-950/90",
          color === "yellow" &&
            "bg-yellow-200 text-yellow-900 hover:bg-yellow-500/90 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-950/90",
        )}
      >
        {text}
      </Badge>
    </motion.div>
  );
};
