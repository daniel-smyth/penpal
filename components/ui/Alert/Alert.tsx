import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";
import cn from "classnames";
import { motion } from "framer-motion";

export interface AlertProps {
  type: "success" | "error";
  open?: boolean;
  onCloseClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  type,
  onCloseClick,
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
        <svg
          aria-hidden="true"
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>{children}</div>
        <button
          type="button"
          onClick={() => onCloseClick && onCloseClick()}
          className={cn(
            type === "error"
              ? "bg-red-50 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:text-red-400"
              : "bg-green-50 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:text-green-400",
            "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2 dark:bg-gray-800 dark:hover:bg-gray-700",
          )}
          data-dismiss-target="#alert-border-1"
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Alert;
