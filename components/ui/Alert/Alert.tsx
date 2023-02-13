import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import cn from "classnames";
import { motion } from "framer-motion";
import { Info as InfoIcon, X as XIcon } from "lucide-react";

interface AlertProps {
  type: "success" | "error";
  className?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  type,
  onClose,
  className,
  children,
}) => {
  return (
    <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
      <div
        className={cn(
          type === "error"
            ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:text-red-400"
            : "border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:text-green-400",
          "flex rounded-lg border p-2 text-sm dark:bg-gray-800",
          className,
        )}
        role="alert"
      >
        <InfoIcon className="mr-3 inline h-5 w-5 flex-shrink-0" />
        <span className="sr-only">Info</span>
        <div>{children}</div>
        <button
          type="button"
          onClick={() => onClose && onClose()}
          className={cn(
            type === "error"
              ? "bg-red-50 text-red-500 dark:text-red-400"
              : "bg-green-50 text-green-500 dark:text-green-400",
            "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5  dark:bg-gray-800 dark:hover:bg-gray-700",
          )}
        >
          <span className="sr-only">Dismiss</span>
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default Alert;
