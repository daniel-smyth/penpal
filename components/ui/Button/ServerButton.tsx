import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import cn from "classnames";
import { LoadingSpinner } from "@components/icons";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "solid" | "flat" | "outline";
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
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
