import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import cn from "classnames";
import { LoadingSpinner } from "@components/icons";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "solid" | "flat" | "outline";
  animated?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  animated = false,
  loading = false,
  className,
  children,
  ...rest
}) => {
  const rootClassName = cn(
    variant === "solid" &&
      "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700",
    variant === "outline" &&
      "border-emerald-600 bg-transparent text-black hover:bg-stone-200 dark:text-white dark:hover:bg-gray-700",
    variant === "flat" &&
      "border-transparent bg-transparent text-black hover:bg-stone-200 dark:text-white dark:hover:bg-gray-700",
    "transition-all inline-flex items-center justify-center rounded-2xl border p-1.5 px-4 text-sm",
    className,
  );

  if (animated) {
    return (
      <motion.button {...rest} className={rootClassName}>
        <>
          {loading && (
            <span className="spinner-grow spinner-sm mr-2 inline-block">
              <svg
                className="mr- -ml-1 h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          )}
          {children}
        </>
      </motion.button>
    );
  }

  return (
    <button {...(rest as any)} className={rootClassName}>
      <>
        {loading && (
          <div className="mr- -ml-1 h-4 w-4 animate-spin text-white">
            <LoadingSpinner />
          </div>
        )}
        {children}
      </>
    </button>
  );
};

export default Button;
