import React, { MouseEventHandler } from "react";
import cn from "classnames";
import { LoadingSpinner } from "@components/icons";

interface ButtonProps {
  size?: "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "flat" | "outline";
  loading?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "solid",
  loading = false,
  children,
  ...rest
}) => {
  const rootClassName = cn(
    size === "medium" && `${loading ? "px-2" : "px-5"} text-sm rounded-3xl`,
    size === "large" && `${loading ? "px-5" : "px-8"} text-lg rounded-3xl`,
    variant === "solid" &&
      "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700",
    variant === "outline" &&
      "border-emerald-600 bg-transparent text-black hover:bg-stone-200 dark:text-white dark:hover:bg-gray-700",
    variant === "flat" &&
      "border-transparent bg-transparent text-black hover:bg-stone-200 dark:text-white dark:hover:bg-gray-700",
    "inline-flex items-center justify-center border py-1.5",
  );

  return (
    <button {...(rest as any)} className={rootClassName}>
      <>
        {loading && (
          <div className={`${size === "medium" ? "mr-1" : "mr-2"}`}>
            <LoadingSpinner size={4} />
          </div>
        )}
        {children}
      </>
    </button>
  );
};

export default Button;
